async (main: URL) => {
  const cache = {}
  const createPromise = <T,E=unknown>() => {
    const early = new Error("resolve or reject was somehow called early, according to the spec this is impossible")
    let resolve: (value: T) => void = () => {
      throw early
    }
    let reject: (error: E) => void = ()=>{
      throw early
    }
    const promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { resolve, reject, promise }
  }
  
  async function require<E extends object>(module: Module | null, target: URL, optional?: false): Promise<E>
  async function require<E extends object>(module: Module | null, target: URL, optional: true): Promise<E | null>
  async function require<E extends object>(module: Module | null, target: URL, optional = false): Promise<E | null> {
    if (target.href in cache) {
      return cache[target.href] as E
      const caughtP = cache[target.href].catch(e => {
        if (optional) {
          return null
        } else {
          throw e
        }
      })
    }
    const p = createPromise<E>()
    const caughtP = p.promise.catch(e => {
      if (optional) {
        return null
      } else {
        throw e
      }
    })
    cache[target.href] = p.promise
    try {
      const res = await fetch(target)
      if (!res.ok) throw new Error(`${res.status} while loading ${target}`)
      const code = await res.text()
      const func = await (eval(code) as (module: Module<E>) => void | Promise<void>)
      const newModule: Module<E> = {
        require: (name: string | URL) => require(newModule, new URL(name, target)),
        filename: target,
        parent: module,
        exports: {} as any as E
      }
      func(newModule)
      p.resolve(newModule.exports)
    } catch (e) {
      p.reject(e)
    }
    return caughtP
  }

  return require(null, main)
}
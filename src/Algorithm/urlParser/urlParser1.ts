function deep_set(fno: object,path: string[], value: string) {
  let i = 0
  for (; i < path.length - 1; i++) {
    if (fno[path[i]] === undefined) {
      fno[path[i]] = {}
    }
    fno = fno[path[i]] // 注意这里有点绕， 此时的 fno 和外部o的某个属性（会随着循环改变）的值， 公用一份引用地址。内部 fno 引用地址的改变不会影响外部o的引用地址
  }
  fno[path[i]] = value
}

function parse(str:string) {
  return str.split('&').reduce((o: object,kv: string) => {
    const [key, value] = kv.split('=')
    if (!value) return o
    // o[key] = value
    deep_set(o, key.split(/[\[\]]/g).filter(x => x), value)
    return o
  }, {})
}

console.log(parse('a=1&b=&c=5&f=hello'));
console.log(parse('a&b&c'));
console.log(parse('a[name]=fox&a[company]=tecent&b=why'));
console.log(parse('color=Deep%20Blue'));
console.log(parse('a[0]=1&a[1]=2'));

function parse0(str: string) {
  return str.split('&').reduce((o: object, kv: string) => {
    const [key, value] = kv.split('=')
    if (!value) return o
    o[key] = value
    return o
  }, {})
}


console.log(parse0('a=1&b=&c=5&f=hello'));
console.log(parse0('a&b&c'));
console.log(parse0('a[name]=fox&a[company]=tecent&b=why'));
console.log(parse0('color=Deep%20Blue'));
console.log(parse0('a[0]=1&a[1]=2'));




class parseUrl {
  deep_set(fno: object, path: string[], value: string) {
    let i = 0;
    for (; i < path.length - 1; i++) {
      if (fno[path[i]] === undefined) {
        if (path[i + 1].match(/^\d+$/)) {
          fno[path[i]] = []
        } else {
          fno[path[i]] = {}
        }
      }
      fno = fno[path[i]]
    }
    fno[path[i]] = value;
  }

  parse(str: string) {
    return str.split('&').reduce((o: object, kv: string) => {
      const [key, value] = kv.split('=');
      if (!value) return o;
      // o[key] = value
      this.deep_set(
        o,
        key.split(/[\[\]]/g).filter((x) => x),
        value
      );
      return o;
    }, {});
  }
}

const parse2 = new parseUrl()

console.log(parse2.parse('a=1&b=&c=5&f=hello'));
console.log(parse2.parse('a&b&c'));
console.log(parse2.parse('a[name]=fox&a[company]=tecent&b=why'));
console.log(parse2.parse('color=Deep%20Blue'));
console.log(parse2.parse('a[0]=1&a[1]=2'));

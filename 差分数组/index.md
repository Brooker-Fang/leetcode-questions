## 差分数组
差分数组的主要适用场景是频繁对原始数组的某个区间的元素进行增减.

## 性质
### 性质一：对原数组的某个区间[left, right]的 改动可以通过 差分数组diff实现。

如 对原数组 [left, right] 所有数组同时加上 x, 等价于 
```js
 diff[left] += x
 diff[right+1] -=x（如果right+1 超过原数组长度，则不需要此操作）
```
因为diff[i] = origin[i] - origin[i-1]
所以给原数组[i, j]区间所有数值都加 x，则diff[i+1] ~ diff[j]值都不变,
而因为origin[i] 增加x, 所以 diff[i] = origin[i](+3) - origin[i-1](不变), 所以 diff[i] 相应的增加3
而origin[j] 增加x，所以diff[j+1] = origin[j+1](不变) - origin[j](+3)，所以diff[j+1] 相应的减少3，当然如果j+1 超过原数组origin的数组长度，则不需要此操作

### 性质二：可以通过差分数组 逆推原数组
差分数组的第一项 = 原数组的第一项
diff[0] = origin[0]

```js
getOrigin() {
  const origin = []
  origin[0] = diff[0]
  for(let i = 1; i < diff.length; i++) {
    origin[i] = origin[i-1] + diff[i]
  }
  return origin
}
```

## 差分数组实现
```js
class DiffArray {
  constructor(origin) {
    this.diff = []
    this.diff[0] = origin[0]
    for(let i = 1; i < origin.length; i++) {
      this.diff[i] = origin[i] - origin[i-1]
    }
  }
  increment(i, j, val) {
    this.diff[i] += val
    if(j+1 < this.diff.length) {
      this.diff[j] -= val
    }
  }

  getOrigin() {
    const origin = []
    origin[0] = diff[0]
    for(let i = 1; i < diff.length; i++) {
      origin[i] = origin[i-1] + this.diff[i]
    }
    return origin
  }
}
```
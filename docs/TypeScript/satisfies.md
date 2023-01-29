---
---

# TypeScript

## satisfies 关键字

> TypeScript 4.9 推出

**功能：** 新的`satisfies`运算符让我们可以验证表达式是否匹配某种类型，同时不改变表达式自身的类型。

没有`satisfies`关键字之前，我们可能写出如下的代码：

- 例子 1：

```ts
type Colors = 'red' | 'green' | 'blue';

type RGB = [red: number, green: number, blue: number];

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  bleu: [0, 0, 255],
  // ~~~~ 能够检测到拼写错误
};

// 🟡 意想不到的错误 - 'palette.red' 可能为 string
const redComponent = palette.red.at(0);
```

这种写法可以监测出`palette`书写的时候，缺少的类型或者多余的类型会进行`ts`的报错提示。
但是，当我们使用`palette.red`的时候，red 的类型会变成`string | RGB`，也就是`palette`本身的的类型推断丢失了，同时每一个属性的类型也被放大了。
遇到这样的时候，我们可能会使用`(palette.red as RGB)`来强行缩小类型，但是**不优雅，不智能**。

- 例子 2：

```ts
type Colors = 'red' | 'green' | 'blue';

type RGB = [red: number, green: number, blue: number];

const palette = {} as Record<Colors, string | RGB>;

// 🔴 no Error
const redComponent = palette.red; // (property) red: string | RGB
```

这种写法可能在解决一些类型的情况下，用的人很多。但是这种写法非常的**低级**，非常不推荐。
这样的写法会让 ts 的类型检测失去意义：本来`palette`对象中没有`red`属性，但是通过这种写法，会通过`ts`的校验，假装有`red`属性，导致后序的一些代码判断可能也会出现逻辑上的错误。

### 优雅解决办法

> 在 `satisfies` 关键字出来以前，可能最多的解决办法就是例子 1 中的办法或者写一个类型保护函数进行判断。
> 现在使用 `satisfies` 关键字的优雅解决办法如下：

```ts
type Colors = 'red' | 'green' | 'blue';

type RGB = [red: number, green: number, blue: number];

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// ✅依然可以访问这些方法，因为会自动验证表达式(palette.red)是否满足某个类型
const redComponent = palette.red.map;
const greenNormalized = palette.green.toUpperCase();
```

### 应用场景

- 用于对象的`key`和`value`的值有多个的情况，但是却没有对这个对象的每一个属性进行类型的定义。
  - 如果对对象的每一个属性的类型都进行定义了，那还是使用例子1的方式方便一点。
  - 同时，如果使用类型定义和这个关键字一起使用的话，会按照类型定义来作为最后的结果。
  - 所以：这个关键字应用在对象字面量的场景上比较合理。

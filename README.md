## 关于路径使用

### js 文件中 import 只能使用相对路径

例如: import { ClassicModel } from '../../models/classic.js'

### 页面中引用组件使用绝对路径

例如:

```xml
{
    "usingComponents": {
        "v-book": "/components/book/index"
    }
}
```

### wxs 只能用相对路径

<wxs src="../../util/filter.wxs"></wxs>

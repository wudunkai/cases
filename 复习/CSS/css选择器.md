css选择器有：https://segmentfault.com/a/1190000013424772

基本选择器：#id .class *  element

组合选择器：E,F[E||F] E F [E里面的F], E>F [E的子元素F],E+F[E的紧邻兄弟F],E~F[E的兄F]

属性选择器：[target],[attribute=value] 属性为target，属性==value的

伪元素选择器：:before :after :first :last

伪类选择器：:hover :visited :link :active :focus

元素选择器

类选择器

ID 选择器

通用选择器 * 使用通用选择时小心。因为它适用于所有的元素，在大型网页利用它可以对性能有明显的影响：网页可以显示比预期要慢。不会有太多的情况下，您想使用此选择。



属性选择器
a[title] {
  color: purple;
}


/* 存在href属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}


/* 存在href属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}


/* 存在href属性并且属性值结尾是".org"的<a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在class属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}

伪类和伪元素
你可能希望某个元素在处于某种状态下呈现另一种样式，例如当鼠标悬停在元素上面时，或者当一个 checkbox 被禁用或被勾选时，又或者当一个元素是它在 DOM 树中父元素的第一个孩子元素时

伪元素
但这次伪元素前缀是两个冒号 (::) —— 同样是添加到选择器后面达到指定某个元素的某个部分。

::after
::before
::first-letter
::first-line
::selection
::backdrop


孩子选择器：

div > p:nth-child(2) {
    color: red;
}


/* 在每组兄弟元素中选择第四个 <p> 元素 */
https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type
p:nth-of-type(4n) {
  color: lime;
}
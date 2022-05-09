不固定宽高实现水平垂直居中

```
 <div class="father">
    <div class="son"></div>
 </div>
```

```
// transform
.father {
    width: 200px;
    height: 200px;
    background: green;
    position: relative;
}
.son {
    background: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

// flex
.father {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: green;
}
.son {
    background: red;
}

//table
.father {
    width: 200px;
    height: 200px;
    background: green;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.son {
    display: inline-block;
    background: red;
}

//grid  兼容问题
.father {
  width: 200px;
  height: 200px;
  background: green;
  display: grid;
  justify-content: center;
  align-items: center;
}
.son {
    background: red;
}
```


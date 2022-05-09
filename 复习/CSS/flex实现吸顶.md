```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
    <style>
        .wrap {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            flex-direction: column;
        }
        .top {
            width: 100%;
            background: yellow;
        }
        .bottom {
            width: 100%;
            flex: 1;
            overflow: scroll;
        }
        .content {
            width: 100%;
            height: 2000px;
            background: red;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="top">
            <p>111</p>
            <p>222</p>
            <p>333</p>
        </div>
        <div class="bottom">
            <div class="content">444</div>
        </div>
    </div>
</body>
</html>
```


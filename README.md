# @xohu/vue-cli-plugin-uni

> 基于 uni-app 修改

 **安装**

  ```
  npm i @xohu/vue-cli-plugin-uni -D
  ```

### 注入的命令
 ```
  使用：uni-cli [options]
  选项：
    --platform 要运行的平台
    --mode 要运行的环境变量文件
    --watch 监听文件变化，自动更新
    --minimize 运行时压缩代码
  ```
  platform 的可取值范围详见：
  [uni-app 官网](https://uniapp.dcloud.io/quickstart?id=%e8%bf%90%e8%a1%8c%e3%80%81%e5%8f%91%e5%b8%83uni-app)

  mode 的使用详见：
  [vue-cli 官网](https://cli.vuejs.org/zh/guide/mode-and-env.html)

### 使用
  ```
  uni-cli serve --platform h5 --mode h5 --watch
  uni-cli build --platform h5 --mode h5
  ```

  ``` js
  如果 --platform 的值 和 uni-app > script 内的配置名一致时将自动读取扩展配置，实现自定义条件编译平台

  例如：uni-cli serve --platform custom-platform

  // package.json
  {
    "uni-app": {// 扩展配置
        "scripts": {
            "custom-platform": { //自定义编译平台配置，可通过cli方式调用
                "title":"自定义扩展名称", // 在HBuilderX中会显示在 运行/发行 菜单中
                "BROWSER":"",  //运行到的目标浏览器，仅当UNI_PLATFORM为h5时有效
                "env": {//环境变量
                    "UNI_PLATFORM": "mp-weixin"  //基准平台 
                 },
                "define": { //自定义条件编译
                    "CUSTOM-CONST": true //自定义条件编译常量，建议为大写
                }
            }
        }    
    }
}
  ```

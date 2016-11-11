# react-native-android-toast

react-native 调用原生 `android` 模块 `Toast` 学习笔记

## 参考官方文档初始化一个react-native项目
[初始化项目](https://facebook.github.io/react-native/docs/getting-started.html)   

```shell
react-native init androidToast
```

生成如下目录：  
<img src="./images/a.png" width="200"/>

## 运行命令查看项目
```shell
react-native run-android
```
### 如图：
<img src="./images/b.png" width="200"/>

## 接入Android原生模块
*按照官方的说法，第一步需要创建一个java类`本例中为：ToastModule`，并继承`ReactContextBaseJavaModule`，然后复写`getName()`方法，其返回值，就是在`react-native`中引用的`组件名称`*  

*复写 `getConstants()`方法可以返回一些`常量`用于react-native中调用，官方文档中 `return "ToastAndroid" 这个名称在原生的组件中已经存在，返回相同的名称将会冲突，so:改个名字吧！！`*  

*`@ReactMethod`注解：用于java返回一个`react-native`中可调用的`方法` ，其不能有返回值所以使用 `void`*

*注册模块：创建java类`本例中为：ExampleReactPackage`，实现`ReactPackage`接口*  

*复写createJSModules() , createViewManagers() 方法，返回`Collections.emptyList()`空集合*

*`createNativeModules()`方法中添加我们需注册的模块对象，`new ToastModule()`,并返回模块集合*  

*添加已注册模块对象到返回集合中，向react-native抛出模块，如：第三步*

*在react-native中调用，如：第四步*


### android目录结构
<img src="./images/c.png" width="200" />

### 注意：引入包的名称不要弄错了

### 第一步：创建模块类
在androidtoast目录下，创建一个ToastModule.java的类  

```java
package com.androidtoast; //包名

import android.widget.Toast; //引入调用的类

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // 复写方法，返回react-native中调用的 组件名
    @Override
    public String getName() {
        return "ToastNative";
    }
    // 复写方法，返回常量
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    // 使用 @ReactMethod注解返回react-native中可调用的 方法
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}

```

### 第二步：注册模块
在androidtoast目录下，创建一个ExampleReactPackage.java的类  

```java

package com.androidtoast;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ExampleReactPackage implements ReactPackage {

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ToastModule(reactContext));

        return modules;
    }
}

```
### 第三步：添加注册类
*添加到 `MainApplication.java` 中的`getPackages()`方法中*

```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(), // 这个是自动创建
      new ExampleReactPackage() // 这个类是我们创建的
  );
}
```

项目结构如下：  
<img src="./images/d.png" width="200"/>  

*Java部分的代码就结束了，再次提醒下：包名啊！！不要弄错了！！！*

### 第四步：修改react-native代码引入原生模块

#### 修改index.android.js
* 引入react-native所需模块 `NativeModules`  
* 获取导出组件`NativeModules.ToastNative`  
* 调用方法`show()`

*修改了下index.android.js文件，代码如下：*
```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules
} from 'react-native';

let toast = NativeModules.ToastNative;

export default class androidToast extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>react-native 调用android原生模块</Text>
        <TouchableOpacity onPress={()=>{
          toast.show('Toast message',toast.SHORT);
        }}>
          <Text style={styles.btn}>Click Me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title:{
    fontSize:16,
  },
  btn:{
    fontSize:16,
    paddingVertical:7,
    paddingHorizontal:10,
    borderColor:'#f00',
    borderWidth:1,
    borderRadius:5,
    marginTop:10,
    color:'#f00'
  }
});

AppRegistry.registerComponent('androidToast', () => androidToast);

```

### 运行程序

```shell
react-native run-android

```

### 效果如下：

<img src="./images/f.png" width="200"/>

## 参考文档
[江清清 ModulesDemo](https://github.com/jiangqqlmj/ModulesDemo)  
[react-native 中文](http://reactnative.cn/docs/0.35/native-modules-android.html#content)  
[react-native 官方英文](https://facebook.github.io/react-native/docs/native-modules-ios.html)  
[RN-Resource-ipk github](https://github.com/ipk2015/RN-Resource-ipk)  

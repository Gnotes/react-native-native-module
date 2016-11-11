package com.androidtoast;

import android.widget.Toast;
import javax.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactContext;

import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private boolean flag = true;
    private int count = 0;
    private ReactContext reactContext;

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ToastNative";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration ,Callback successCallback, Callback errorCallback) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        if(flag) successCallback.invoke("success", ++count);
        else errorCallback.invoke("error", ++count);
        flag = !flag;
        // 静态方法
        WritableMap map = Arguments.createMap();
        map.putBoolean("boolean",true);
        map.putDouble("double",0.003);
        map.putString("string","string");
        sendEvent(this.reactContext, "eventName",map);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
    }
}

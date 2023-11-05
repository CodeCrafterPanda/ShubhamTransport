package com.demotemplate;

import android.database.ContentObserver;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.content.Context;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class AutoRotationModule extends ReactContextBaseJavaModule {
    // Inner class that observes changes in auto-rotation setting
    private class RotationSettingObserver extends ContentObserver {
        public RotationSettingObserver(Handler handler) {
            super(handler);
        }

        @Override
        public void onChange(boolean selfChange) {
            int rotationSetting = Settings.System.getInt(
                    getReactApplicationContext().getContentResolver(),
                    Settings.System.ACCELEROMETER_ROTATION, 0);

            getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("autoRotationSettingChanged", rotationSetting);
        }
    }

    private RotationSettingObserver rotationSettingObserver;

    // Constructor
    public AutoRotationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // Use the main Looper from the main thread
        rotationSettingObserver = new RotationSettingObserver(new Handler(Looper.getMainLooper()));
    }

    // Module name in JavaScript
    @Override
    public String getName() {
        return "AutoRotationModule";
    }

    // Register the observer on initialization
    @Override
    public void initialize() {
        getReactApplicationContext().getContentResolver().registerContentObserver(
                Settings.System.getUriFor(Settings.System.ACCELEROMETER_ROTATION),
                false,
                rotationSettingObserver);
    }

    // Unregister the observer on instance destruction
    @Override
    public void onCatalystInstanceDestroy() {
        getReactApplicationContext().getContentResolver().unregisterContentObserver(rotationSettingObserver);
    }
}

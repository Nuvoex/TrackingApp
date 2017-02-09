# TrackingApp
NuvoEx Shipment Tracking App <br><br>
Getting Start with react-native <br>
https://facebook.github.io/react-native/docs/getting-started.html

# Development Set Up
Install Git, Brew
* Install Node "brew install node"
* Install Watchman for watching changes in the filesystem "brew install watchman"
* Install Android-sdk "brew install android-sdk"
* Set ANDROID_HOME in ".profile"
* Checkout this repo
* Change dir to repo "cd TrackingApp"
* Install Packages "npm install"

# Run this App

* <b>For Staging</b> <br>
(react-native run-android --variant=staging)&&(adb shell am start -n com.nuvoex.tracking.staging/com.tracking.MainActivity)<br><br>
* <b>For Production</b> <br>
(react-native run-android --variant=prod)&&(adb shell am start -n com.nuvoex.tracking.staging/com.tracking.MainActivity)


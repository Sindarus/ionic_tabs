#!/bin/bash
echo "BUILDING =========================================================="
cordova build --release android
cd platforms/android/build/outputs/apk/
echo "CREATING SIGNING KEY =============================================="
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
echo "SIGNING APK ======================================================="
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name
echo "ALIGNING APK ======================================================"
zipalign -v 4 android-release-unsigned.apk android-release.apk
echo "MOVING APK TO ROOT DIR ============================================"
mv android-release.apk ../../../../../
echo "DONE =============================================================="
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";

const Header = () => {
    return (
        <View className="w-full h-full">
            <Image
                source={images.japan}
                className="size-full top-0 h-1/3 rounded-bl-[10%] rounded-br-[10%]"
                resizeMode="cover"
            />
            <Image
                source={images.whiteGradient}
                className="absolute top-0 w-full"
            />

            <View className="z-50 top-8 absolute inset-x-7">
                <View className="flex flex-row items-center w-full justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                    >
                        <Image source={icons.backArrow} className="size-5" />
                    </TouchableOpacity>

                    <View className="flex flex-row items-center gap-3">
                        <Image
                            source={icons.heart}
                            className="size-7"
                            tintColor={"#191D31"}
                        />
                        <Image source={icons.send} className="size-7" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Header;

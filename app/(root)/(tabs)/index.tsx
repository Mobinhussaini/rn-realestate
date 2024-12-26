import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/no-results";
import Search from "@/components/search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const { data: featuredProperties, loading: featuredPropertiesLoading } =
        useAppwrite({
            fn: getLatestProperties,
        });

    const {
        data: properties,
        loading,
        refetch,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 12,
        },
        skip: true,
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 12,
        });
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-2 py-1 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator
                            size={"large"}
                            className="text-primary-300"
                        />
                    ) : (
                        <NoResults />
                    )
                }
                renderItem={({ item }) => (
                    <Card
                        item={item}
                        onPress={() => handleCardPress(item.$id)}
                    />
                )}
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className=" flex flex-row items-center">
                                <Image
                                    source={images.avatar}
                                    className="size-12 rounded-full"
                                />
                                <View className="flex flex-col items-start ml-3 justify-center">
                                    <Text className="text-xs font-rubik text-black-100">
                                        Good Morning
                                    </Text>
                                    <Text className="text-base font-rubik-medium text-black-300">
                                        {user?.name}
                                    </Text>
                                    <Text className="text-sm font-rubik-medium text-black-300">
                                        {user?.email}
                                    </Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className="size-6" />
                        </View>
                        <Search />

                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">
                                    Featured
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-base font-rubik-bold text-primary-300">
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {featuredPropertiesLoading ? (
                                <ActivityIndicator
                                    size={"large"}
                                    className="text-primary-300 mt-5"
                                />
                            ) : !featuredProperties ||
                              featuredProperties.length === 0 ? (
                                <NoResults />
                            ) : (
                                <FlatList
                                    data={featuredProperties}
                                    horizontal
                                    keyExtractor={(item) => item.$id}
                                    showsHorizontalScrollIndicator={false}
                                    bounces={false}
                                    contentContainerClassName="flex gap-3 mt-5"
                                    renderItem={({ item }) => (
                                        <FeaturedCard
                                            item={item}
                                            onPress={() =>
                                                handleCardPress(item.$id)
                                            }
                                        />
                                    )}
                                />
                            )}
                        </View>

                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">
                                Our Recommendations
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Filters />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

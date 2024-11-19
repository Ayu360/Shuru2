import React, { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  ListRenderItemInfo,
  Text,
} from "react-native";
const { width } = Dimensions.get("window");

const Carousel = () => {
  const data = [1, 2, 3];
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollX / width);
    setActiveIndex(currentIndex);
  };

  const renderItem = ({ item }: ListRenderItemInfo<number>) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/group.png")}
          // style={styles.image}
          style={{
            width: width,
            height: 400,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderItem}
      />
      <View style={styles.carouselFooter}>
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <TouchableOpacity key={index} style={styles.touchable}>
              <View
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <EvilIcons name="share-google" size={40} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff8e8",
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    width: width,
    backgroundColor: "#fff8e8",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    paddingBottom: 1,
    marginBottom: 10,
  },
  dotContainer: {
    flexDirection: "row",
    width: "65%",
    justifyContent: "flex-end",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d2d79f",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "green",
  },
  touchable: {
    padding: 5,
  },
});

export default Carousel;

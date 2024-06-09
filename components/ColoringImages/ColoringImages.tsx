import { Text, View, useWindowDimensions } from "react-native";
import { SvgUri } from "react-native-svg";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import tw from "twrnc";
import useColoringImages from "@/hooks/api/useColoringImages";

const ColoringImages = () => {
  const { width } = useWindowDimensions();
  const { data: { coloringImages } = {}, isLoading } = useColoringImages();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!coloringImages) {
    return <Text>No data</Text>;
  }

  const getNumColumns = () => {
    if (width >= 768) {
      return 3; // iPad
    } else if (width >= 414) {
      return 2; // Large iPhone
    } else {
      return 1; // Small iPhone
    }
  };

  const numColumns = getNumColumns();

  return (
    <FlashList
      data={coloringImages}
      renderItem={({ item }) => (
        <Link
          href={`/coloring-image/${item.id}`}
          style={{
            flex: 1 / numColumns,
            backgroundColor: "#FFFFFF",
            aspectRatio: 1,
            marginVertical: 5,
            marginHorizontal: "auto",
          }}
        >
          <View
            style={{
              aspectRatio: 1,
            }}
          >
            <SvgUri
              uri={item.svgUrl as string}
              style={tw`border-2 border-black`}
              width="100%"
              height="100%"
              viewBox="0 0 1024 1024"
            />
          </View>
          //{" "}
        </Link>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      estimatedItemSize={10}
    />
  );
};

export default ColoringImages;

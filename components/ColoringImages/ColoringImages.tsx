import { Text, View, Dimensions, Pressable } from "react-native";
import { Link } from "expo-router";
import { SvgUri } from "react-native-svg";
import { FlashList } from "@shopify/flash-list";
import tw from "twrnc";
import useColoringImages from "@/hooks/api/useColoringImages";

// TODO: implement multi-column layout based on screen width
// const getNumColumns = () => {
//   if (width >= 768) {
//     return 3; // iPad
//   } else if (width >= 414) {
//     return 2; // Large iPhone
//   } else {
//     return 1; // Small iPhone
//   }
// };

const screenWidth = Dimensions.get("window").width;
const padding = 20;
const numColumns = 1;
// const columnWidth = width / numColumns;
const squareSize = (screenWidth - padding * 2) / numColumns;

const ColoringImages = () => {
  const { data: { coloringImages } = {}, isLoading } = useColoringImages();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!coloringImages) {
    return <Text>No data</Text>;
  }

  const Square = ({ path, svgUri }: { path: string; svgUri: string }) => (
    <Link
      href={path}
      style={tw.style(`flex-1`, {
        marginBottom: padding,
      })}
      asChild
    >
      <Pressable>
        <View
          style={tw.style(
            `bg-white rounded-lg shadow-lg justify-center items-center`,
            {
              width: squareSize,
              height: squareSize,
            },
          )}
        >
          <SvgUri
            width={squareSize}
            height={squareSize}
            uri={svgUri}
            viewBox="0 0 1024 1024"
          />
        </View>
      </Pressable>
    </Link>
  );

  return (
    <FlashList
      data={coloringImages}
      renderItem={({ item }) => (
        <Square
          path={`/coloring-image/${item.id}`}
          svgUri={item.svgUrl as string}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      estimatedItemSize={squareSize + padding}
      contentContainerStyle={{
        padding,
      }}
    />
  );
};

export default ColoringImages;

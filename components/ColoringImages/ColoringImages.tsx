import { Text, View, Dimensions, Pressable } from "react-native";
import { Link } from "expo-router";
import { SvgUri } from "react-native-svg";
import { FlashList } from "@shopify/flash-list";
import tw from "twrnc";
import useColoringImages from "@/hooks/api/useColoringImages";

const getNumColumns = (width: number) => {
  if (width >= 768) {
    return 3; // iPad
  } else if (width >= 414) {
    return 2; // Large iPhone
  } else {
    return 1; // Small iPhone
  }
};

const screenWidth = Dimensions.get("window").width;
const padding = 20;
const numColumns = getNumColumns(screenWidth);
const gridGap = 20;
const squareSize =
  (screenWidth - padding * 2 - gridGap * (numColumns - 1)) / numColumns;

const ColoringImages = () => {
  const { data: { coloringImages } = {}, isLoading } = useColoringImages();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!coloringImages) {
    return <Text>No data</Text>;
  }

  const Square = ({
    path,
    svgUri,
    style,
  }: {
    path: string;
    svgUri: string;
    style?: Record<string, unknown>;
  }) => (
    <Link
      href={path}
      style={tw.style({
        ...style,
      })}
      asChild
    >
      <Pressable style={tw`flex-1`}>
        <View
          style={tw.style(
            `bg-white rounded-lg shadow-lg justify-center items-center flex-1`,
          )}
        >
          <SvgUri
            width="100%"
            height="100%"
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
      renderItem={({ item, index }) => {
        const isLastColumn = (index + 1) % numColumns === 0;
        const isLastRow =
          Math.floor(index / numColumns) ===
          Math.floor((coloringImages.length - 1) / numColumns);

        return (
          <Square
            path={`/coloring-image/${item.id}`}
            svgUri={item.svgUrl as string}
            style={tw.style({
              width: squareSize,
              height: squareSize,
              marginRight: isLastColumn ? 0 : gridGap,
              marginBottom: isLastRow ? 0 : gridGap,
            })}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      estimatedItemSize={squareSize + padding}
      contentContainerStyle={{
        padding,
      }}
    />
  );
};

export default ColoringImages;

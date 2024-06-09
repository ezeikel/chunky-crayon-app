import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ColorPalette from "@/components/ColorPalette/ColorPalette";
import ImageCanvas from "@/components/ImageCanvas/ImageCanvas";
import useColoringImage from "@/hooks/api/useColoringImage";

const ColoringImage = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useColoringImage(id as string);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data</Text>;
  }

  const { coloringImage } = data;

  return (
    <View>
      <View>
        <Text>{coloringImage.title}</Text>
        <Text>by Chunky Crayon</Text>
      </View>
      <View>
        <ColorPalette />
        <ImageCanvas />
      </View>
    </View>
  );
};

export default ColoringImage;

import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import tw from "twrnc";
import ColorPalette from "@/components/ColorPalette/ColorPalette";
import ImageCanvas from "@/components/ImageCanvas/ImageCanvas";
import useColoringImage from "@/hooks/api/useColoringImage";
import SaveButton from "@/components/buttons/SaveButton/SaveButton";

const ColoringImage = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useColoringImage(id as string);
  const [scroll, setScroll] = useState(true);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>No data</Text>;
  }

  const { coloringImage } = data;

  return (
    <View style={tw.style(`flex-1 bg-[#FF8A65]`)}>
      <Stack.Screen
        options={{
          title: coloringImage.title,
          headerBackTitleVisible: false,
        }}
      />
      <ScrollView
        contentContainerStyle={tw.style(`flex-grow items-center p-2`)}
        scrollEnabled={scroll}
      >
        <View style={tw`w-full mb-8`}>
          <Text style={tw`text-3xl font-bold text-white text-center`}>
            {coloringImage.title}
          </Text>
          <Text style={tw`text-base text-white text-center`}>
            by Chunky Crayon
          </Text>
        </View>
        <View style={tw`flex-3 w-full border-0 border-red-800`}>
          <ColorPalette style={tw`mb-4`} />
          <ImageCanvas
            coloringImage={coloringImage}
            setScroll={setScroll}
            style={tw`mb-4`}
          />
          <SaveButton coloringImage={coloringImage} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ColoringImage;

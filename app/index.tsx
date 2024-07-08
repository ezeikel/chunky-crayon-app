import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagicWandSparkles } from "@fortawesome/pro-regular-svg-icons";
import ColoringImages from "@/components/ColoringImages/ColoringImages";
import CreateColoringImageForm from "@/components/forms/CreateColoringImageForm/CreateColoringImageForm";

const padding = 20;

const Index = () => {
  const [screenWidth] = useState(Dimensions.get("window").width);

  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={["#FFF2E6", "#FFE6CC"]} style={tw`flex-1`}>
        <View
          style={tw.style(
            `self-center w-full md:1/2 max-w-lg flex flex-col gap-y-6 p-8 bg-white rounded-lg shadow-lg m-4`,
            {
              width: screenWidth - padding * 2,
            },
          )}
        >
          <View style={tw`text-center`}>
            <Text
              style={tw`text-[#FF8A65] text-base leading-1.4 text-lg text-center mb-2`}
            >
              Unleash your creativity! Describe a scene and let Chunky Crayon
              generate a coloring book page for you{" "}
              <FontAwesomeIcon
                icon={faMagicWandSparkles}
                size={20}
                style={tw`text-[#FF8A65] text-base`}
              />
            </Text>
            <Text style={tw`text-gray-400 text-sm font-bold text-center`}>
              (This can take up to 2 minutes - please be patient)
            </Text>
          </View>
          <CreateColoringImageForm />
        </View>
        <ColoringImages />
      </LinearGradient>
    </View>
  );
};

export default Index;

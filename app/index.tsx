import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import ColoringImages from "@/components/ColoringImages/ColoringImages";
import CreateColoringImageForm from "@/components/forms/CreateColoringImageForm/CreateColoringImageForm";

const Index = () => {
  return (
    <View style={tw`flex-1`}>
      <LinearGradient colors={["#FFF2E6", "#FFE6CC"]} style={tw`flex-1`}>
        <View
          style={tw`self-center w-1/2 md:auto max-w-lg flex flex-col gap-y-6 p-8 bg-white rounded-lg shadow-lg m-4`}
        >
          <CreateColoringImageForm />
        </View>
        <ColoringImages />
      </LinearGradient>
    </View>
  );
};

export default Index;

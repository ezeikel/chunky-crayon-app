import { View, useWindowDimensions } from "react-native";
import {
  Canvas,
  ImageSVG,
  useCanvasRef,
  useSVG,
  fitbox,
  rect,
  Group,
} from "@shopify/react-native-skia";
import tw from "twrnc";
import { ColoringImage } from "@/types";

type ImageCanvasProps = {
  coloringimage: ColoringImage;
};

const ImageCanvas = ({ coloringimage }: ImageCanvasProps) => {
  const canvasRef = useCanvasRef();
  const { width: screenWidth } = useWindowDimensions();
  const svg = useSVG(coloringimage.svgUrl);

  const canvasSize = screenWidth;

  const src = rect(0, 0, svg?.width() ?? 0, svg?.height() ?? 0);
  const dst = rect(0, 0, canvasSize, canvasSize);

  // taking into account the padding of the parent View (8px on each side)
  const canvasSizeWithPadding = canvasSize - 16;

  return (
    <View
      style={tw.style(`bg-white rounded-lg shadow-lg`, {
        height: canvasSizeWithPadding,
        width: canvasSizeWithPadding,
      })}
    >
      {svg && (
        <Canvas
          ref={canvasRef}
          style={tw.style({
            height: canvasSizeWithPadding,
            width: canvasSizeWithPadding,
          })}
        >
          <Group transform={fitbox("contain", src, dst)}>
            <ImageSVG
              x={0}
              y={0}
              width={canvasSize}
              height={canvasSize}
              svg={svg}
            />
          </Group>
        </Canvas>
      )}
    </View>
  );
};

export default ImageCanvas;

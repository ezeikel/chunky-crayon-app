import { Button } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { ColoringImage } from "@/types";

type SaveButtonProps = {
  coloringImage: ColoringImage;
};

const SaveButton = ({ coloringImage }: SaveButtonProps) => {
  const createPDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${coloringImage.title}</title>
          <style>
            .coloring-images {
              width: 100%;
              height: auto;
            }

            footer {
              display: flex;
              align-items: center;
              gap: 16px;
            }

            .cta {
              display: flex;
              flex-direction: column;
              gap: 4;
              max-width: 50%;
        
            }
            
            p {
              font-size: 18px;
              margin: 0;
            }


            a {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <svg class="coloring-image" viewBox="0 0 1024 1024">       
            <image xlink:href="${coloringImage.svgUrl}" />    
          </svg>
          <footer>
            <svg class="qr-code" viewBox="0 0 1024 1024" width="120px" height="120px">       
              <image xlink:href="${coloringImage.qrCodeUrl}" width="100%" height="100%" />    
            </svg>
            <div class="cta">
              <div>
                <p>Scan the QR code to discover more coloring pages!</p>
                <a href="https://chunkycrayon.com?utm_source=${coloringImage.id}&utm_medium=pdf-link&utm_campaign=coloring-image-pdf">www.chunkycrayon.com</a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        width: 595,
        height: 842,
      });
      console.log("PDF generated at:", uri);
      // Optionally, you can share the PDF file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <Button title="Create PDF" onPress={createPDF} />;
};

export default SaveButton;

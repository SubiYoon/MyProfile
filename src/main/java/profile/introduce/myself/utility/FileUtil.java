package profile.introduce.myself.utility;

import jakarta.annotation.Nullable;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

public class FileUtil {

    public enum ImageFormat{
        PNG, JPG, JPEG, GIF
    }

    /**
     * 파일 저장
     * @param multipartFile
     * @param path
     */
    public static String saveFile(MultipartFile multipartFile, String path) {
        String fileName = multipartFile.getOriginalFilename();
        String[] slitFileName = fileName.split("[.]");
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }

        FileOutputStream fos;
        try {
            byte[] fileBytes = multipartFile.getBytes();
            file = new File(path + fileName);
            for(int i=1; ; i++){
                if(file.exists()){
                    file = new File(path + slitFileName[0] + "(" + i + ")");
                } else {
                    fos = new FileOutputStream(file.getAbsolutePath());
                    break;
                }
            }

            fos.write(fileBytes);
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return file.getName();
    }

    /**
     * 파일의 이름을 변경하여 저장한다. 네 번째 인자를 넣지 않으면 확장자는 변경되지 않는다.
     * @param multipartFile multipartFile
     * @param path 저장할 경로
     * @param name 변경할 이름
     * @param extenstion [nullalbe] 확장자
     * @param isNested 중복파일 있을 시 true로 설정하면 ${name}(i).${extension} 방식으로 생성되고 false시 덮어 씌웁니다.
     */
    public static String saveFileChageName(MultipartFile multipartFile, String path, String name, @Nullable String extenstion, boolean isNested) {
        String[] splitFileName = multipartFile.getOriginalFilename().split("[.]");
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }

        FileOutputStream fos;
        try {
            byte[] fileBytes = multipartFile.getBytes();

            // 확장자가 지정되지 않을시에 동작
            if(ItemCheck.isEmpty(extenstion)){
                file = new File(path + name + "." + splitFileName[1] );
                if(isNested){
                    for(int i=1; ; i++){
                        if(file.exists()){
                            file = new File(path + name + "(" + i + ")" + "." +splitFileName[1]);
                        } else {
                            fos = new FileOutputStream(file.getAbsolutePath());
                            break;
                        }
                    }
                } else {
                    fos = new FileOutputStream(file.getAbsolutePath());
                }
            // 확장자가 지정되었을 경우 동작
            } else {
                file = new File(path + name + "." + extenstion);
                if(isNested){
                    for(int i=1; ; i++){
                        if(file.exists()){
                            file = new File(path + name + "(" + i + ")" + "." + extenstion);
                        } else {
                            fos = new FileOutputStream(file.getAbsolutePath());
                            break;
                        }
                    }
                } else {
                    fos = new FileOutputStream(file.getAbsolutePath());
                }
            }

            fos.write(fileBytes);
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return file.getName();
    }

    /**
     * pdf의 각 페이지를 설정한 포멧형식에 맞게 이미지로 변환
     * @param source 변환할 PDF 파일
     * @param destination 저장할 폴더 경로
     * @param nameFormat 이미지파일명 포멧. {@link java.lang.String#format}을 따르고 pdfPageNo가 arguments로 제공됨 ex)"img_%s.png"
     * @param imageFormat png, jpg, jpeg, gif
     * @param startIndex 이미지 생성 시작 페이지 index
     * @param endIndex 이미지 생성 마지막 페이지 index, not include
     * @throws IOException
     */
    public void pdf2Iamge(
            File source,
            File destination,
            String nameFormat,
            ImageFormat imageFormat,
            int startIndex,
            int endIndex) throws IOException {
        String savePath = destination.getAbsolutePath();
        File dir = new File(savePath);
        int pageCount = 1;
        if(!dir.exists()){
            dir.mkdirs();
        }

        PDDocument document = PDDocument.load(source);
        PDFRenderer pdfRenderer = new PDFRenderer(document);

        for(int pdfPageNo = startIndex; pdfPageNo < document.getNumberOfPages(); pdfPageNo++){
            if(pdfPageNo == endIndex){
                break;
            }

            BufferedImage bufferedImage = pdfRenderer.renderImageWithDPI(pdfPageNo, 300);
            File imageFilePath = new File(destination, String.format(nameFormat, pageCount));

            for(int i = 0; ; i++){
                if(imageFilePath.exists()){
                    imageFilePath = new File(destination, String.format(nameFormat, pageCount + "(" + i + ")"));
                }else {
                    break;
                }
            }

            ImageIO.write(bufferedImage, imageFormat.name(), imageFilePath);

            pageCount++;
        }
        document.close();
    }


    /**
     * pdf의 각 페이지를 설정한 포멧형식에 맞게 이미지로 변환. 이미지 파일 너비와 높이 설정 가능
     * @param source 변환할 PDF 파일
     * @param destination 저장할 폴더 경로
     * @param nameFormat 이미지파일명 포멧. {@link java.lang.String#format}을 따르고 pdfPageNo가 arguments로 제공됨 ex)"img_%d.png"
     * @param imageFormat png, jpg, jpeg, gif
     * @param startIndex 이미지 생성 시작 페이지 index
     * @param endIndex 이미지 생성 마지막 페이지 index, not include
     * @param widthSize 너비 사이즈
     * @param heightSize 높이 사이즈
     * @throws IOException
     */
    public void pdf2Iamge(
            File source,
            File destination,
            String nameFormat,
            ImageFormat imageFormat,
            int startIndex,
            int endIndex,
            int widthSize,
            int heightSize) throws IOException {
        String savePath = destination.getAbsolutePath();
        File dir = new File(savePath);
        int pageCount = 1;
        if(!dir.exists()){
            dir.mkdirs();
        }

        PDDocument document = PDDocument.load(source);
        PDFRenderer pdfRenderer = new PDFRenderer(document);

        for(int pdfPageNo = startIndex; pdfPageNo < document.getNumberOfPages(); pdfPageNo++){
            if(pdfPageNo == endIndex){
                break;
            }

            BufferedImage bufferedImage = pdfRenderer.renderImageWithDPI(pdfPageNo, 300);

            File imageFilePath = new File(destination, String.format(nameFormat, pdfPageNo));
            for(int i = 0; ; i++){
                if(imageFilePath.exists()){
                    imageFilePath = new File(destination, String.format(nameFormat, pageCount + "(" + i + ")"));
                }else {
                    break;
                }
            }

            ImageIO.write(bufferedImage, imageFormat.name(), imageFilePath);

            pageCount++;

            Image oldimage = ImageIO.read(imageFilePath);
            Image resizeImage = oldimage.getScaledInstance(widthSize, heightSize, Image.SCALE_SMOOTH);
            BufferedImage newImage = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
            Graphics graphics = newImage.getGraphics();
            graphics.drawImage(resizeImage, 0, 0, null);
            graphics.dispose();
            ImageIO.write(newImage, imageFormat.name(), imageFilePath);
        }
        document.close();
    }

    /**
     * 이미지를 Base64로 인코딩
     * @param filePath 파일 위치
     * @param fileName 파일 이름
     * @return Base64로 인코딩된 파일 정보
     * @throws IOException
     */
    public String imageToBase64(String filePath, String fileName) throws IOException {
        String base64Img ="";

        File file = new File(filePath + fileName);
        if(file.exists() && file.isFile() && file.length()>0){
            byte[] fileBytes = new byte[(int)file.length()];
            FileInputStream fis = null;
            try {
                fis = new FileInputStream(file);
                fis.read(fileBytes);
                base64Img = Base64.encodeBase64String(fileBytes);
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            } finally {
                if(fis != null){
                    fis.close();
                }
            }
        }
        return base64Img;
    }
}

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

class Produto {
    private Date data;
    private BigInteger id;
    private String nome;
    private Number quantidade;
    private Number precoUnitario;

    public Produto(Date data, BigInteger id, String nome, Number quantidade, Number precoUnitario) {
        this.data = data;
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    public BigInteger getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Number getQuantidade() {
        return quantidade;
    }

    public Number getPrecoUnitario() {
        return precoUnitario;
    }

    public Date getData() {
        return data;
    }
}

public class SoapClient {

    public static void main(String[] args) {
        List<Produto> produtos = new ArrayList<>();
        String wsURL = "http://127.0.0.1:8088/produtos";
        String xmlInput = """
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.jaxwscrudservice.fourcatsdev.com/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <ser:listar/>
                   </soapenv:Body>
                </soapenv:Envelope>
                """;

        try {
            URL url = new URL(wsURL);
            URLConnection connection = url.openConnection();
            HttpURLConnection httpConn = (HttpURLConnection) connection;

            byte[] buffer = new byte[xmlInput.length()];
            buffer = xmlInput.getBytes();

            // Set the appropriate HTTP parameters.
            httpConn.setRequestProperty("Content-Length", String
                    .valueOf(buffer.length));

            httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");

            httpConn.setRequestMethod("POST");
            httpConn.setDoOutput(true);
            OutputStream out = httpConn.getOutputStream();
            out.write(buffer);
            out.close();

            // Read the response and write it to standard out.
            InputStreamReader isr = new InputStreamReader(httpConn.getInputStream());
            BufferedReader  in = new BufferedReader(isr);

            String responseString = null;
            String outputString="";
            while ((responseString = in.readLine()) != null)
            {
                outputString = outputString + responseString;
            }

            // Get the response from the web service call
            Document document = parseXmlFile(outputString);

            NodeList nodeList = document.getElementsByTagName("return");

            for (int i = 0; i < nodeList.getLength(); i++) {
                NodeList children = nodeList.item(i).getChildNodes();
                Date data = (Date) children.item(0).getTextContent();

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        //return produtos;
    }

    private static Document parseXmlFile(String in) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(in));
            return db.parse(is);
        } catch (ParserConfigurationException | SAXException | IOException e) {
            throw new RuntimeException(e);
        }
    }

}

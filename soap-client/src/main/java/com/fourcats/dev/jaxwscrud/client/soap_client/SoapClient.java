package com.fourcats.dev.jaxwscrud.client.soap_client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.net.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import com.fourcats.dev.jaxwscrud.client.soap_client.model.Produto;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class SoapClient {
    static String wsURL = "http://127.0.0.1:8088/produtos";

    public static List<Produto> getProdutos() throws IOException, ParseException {
        List<Produto> produtos = new ArrayList<>();

        String xmlInput = """
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.jaxwscrudservice.fourcatsdev.com/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <ser:listar/>
                   </soapenv:Body>
                </soapenv:Envelope>
                """;

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
        BufferedReader in = new BufferedReader(isr);

        String responseString = null;
        String outputString = "";
        while ((responseString = in.readLine()) != null) {
            outputString = outputString + responseString;
        }

        // Get the response from the web service call
        Document document = parseXmlFile(outputString);

        NodeList nodeList = document.getElementsByTagName("return");

        for (int i = 0; i < nodeList.getLength(); i++) {
            NodeList children = nodeList.item(i).getChildNodes();
            produtos.add(criarProduto(children));
            System.out.println(produtos.get(i).toString());
        }


        return produtos;
    }

    public static Produto consultarProduto(long id) throws IOException, ParseException {
        String xmlInput = String.format("""
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.jaxwscrudservice.fourcatsdev.com/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <ser:ler>
                         <arg0>%s</arg0>
                      </ser:ler>
                   </soapenv:Body>
                </soapenv:Envelope>
                """, id);

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
        httpConn.setDoInput(true);
        httpConn.setDoOutput(true);
        OutputStream out = httpConn.getOutputStream();
        out.write(buffer);
        out.close();

        // Read the response and write it to standard out.
        InputStreamReader isr = new InputStreamReader(httpConn.getInputStream());
        BufferedReader in = new BufferedReader(isr);

        String responseString = null;
        String outputString = "";
        while ((responseString = in.readLine()) != null) {
            outputString = outputString + responseString;
        }

        // Get the response from the web service call
        Document document = parseXmlFile(outputString);
        NodeList nodeList = document.getElementsByTagName("return");
        NodeList children = nodeList.item(0).getChildNodes();

        return criarProduto(children);
    }

    public static Produto alterarProduto(Produto produto) throws IOException, ParseException {
        String xmlInput = String.format("""
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.jaxwscrudservice.fourcatsdev.com/">
                   <soapenv:Header/>
                   <soapenv:Body>
                      <ser:alterar>
                         <!--Optional:-->
                         <arg0>
                            <!--Optional:-->
                            <data>%s</data>
                            <id>%s</id>
                            <!--Optional:-->
                            <nome>%s</nome>
                            <!--Optional:-->
                            <preco>%s</preco>
                            <!--Optional:-->
                            <quantidade>%s</quantidade>
                         </arg0>
                      </ser:alterar>
                   </soapenv:Body>
                </soapenv:Envelope>
                """, produto.getData(), produto.getId(), produto.getNome(), produto.getPrecoUnitario(), produto.getQuantidade());

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
        httpConn.setDoInput(true);
        httpConn.setDoOutput(true);
        OutputStream out = httpConn.getOutputStream();
        out.write(buffer);
        out.close();

        // Read the response and write it to standard out.
        InputStreamReader isr = new InputStreamReader(httpConn.getInputStream());
        BufferedReader in = new BufferedReader(isr);

        String responseString = null;
        String outputString = "";
        while ((responseString = in.readLine()) != null) {
            outputString = outputString + responseString;
        }

        // Get the response from the web service call
        Document document = parseXmlFile(outputString);
        NodeList nodeList = document.getElementsByTagName("return");
        NodeList children = nodeList.item(0).getChildNodes();

        return criarProduto(children);
    }


    private static Produto criarProduto(NodeList children) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date data = dateFormat.parse(children.item(0).getTextContent());
        Long id = Long.parseLong(children.item(1).getTextContent());
        String nome = children.item(2).getTextContent();
        Double precoUnitario = Double.parseDouble(children.item(3).getTextContent());
        int quantidade = Integer.parseInt(children.item(4).getTextContent());
        return new Produto(data, id, nome, quantidade, precoUnitario);
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


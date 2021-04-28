package com.storeproject.tests;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class HttpSourceCall {
	/**
     * @param args
     */
    public static void main(String[] args) {
        String urlPath = "https://store.kakaofriends.com/kr/info/storeInfo";
        String pageContents = "";
        StringBuilder contents = new StringBuilder();
 
        try{
 
            URL url = new URL(urlPath);
            URLConnection con = (URLConnection)url.openConnection();
            InputStreamReader reader = new InputStreamReader (con.getInputStream(), "utf-8");
 
            BufferedReader buff = new BufferedReader(reader);
 
            while((pageContents = buff.readLine())!=null){
                //System.out.println(pageContents);             
                contents.append(pageContents);
                contents.append("\r\n");
            }
 
            buff.close();
 
            System.out.println(contents.toString());
 
        }catch(Exception e){
            e.printStackTrace();
        }
 
    }
}

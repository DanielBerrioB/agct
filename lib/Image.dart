import "package:flutter/material.dart";
import 'dart:convert' as convert;
import "package:http/http.dart" as http;

class Images extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _Image();
}

class _Image extends State<Images> {
  var arrayElement = [];

  @override
  void initState() {
    super.initState();
    getElements();
  }

  void getElements() async {
    var response = await http.get("https://imagesa.herokuapp.com/main/");
    var jsonResponse = convert.jsonDecode(response.body);
    arrayElement = jsonResponse;
    print(arrayElement);
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    getElements();
    return new Scaffold(
      appBar: new AppBar(
        elevation: 1.0,
        title: new Text("Image"),
      ),
      body: new Stack(
        children: <Widget>[
          new Text(arrayElement.toString()),
          new Center(
            child: new Image.network(
                "https://imagesa.herokuapp.com/uploads/Captura3.PNG",
                fit: BoxFit.cover,
                height: MediaQuery.of(context).size.height / 2,
                width: MediaQuery.of(context).size.width),
          )
        ],
      ),
    );
  }
}

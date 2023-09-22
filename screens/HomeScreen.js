import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Image, Linking, View, SafeAreaView, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";



export default function HomeScreen() {

    const [ inputText, setInputText ] = useState("");
    const [ results, setResults ] = useState([{a: "nhcsdikhcsdksdkncksd", b: "rrrrrrrrrrrrrrrrrrr"}]);

    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []),

    useEffect(() => {

    }, []);


    const submitText = async() => {
        axios.post("https://smarter-ai-backend.vercel.app/", {
            inputText,
        })
        .then(res => {
            setResults([...results, {a: inputText, b: res.data.replace(/^\W+|\n/g, "")}]);
            setInputText("");
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => Linking.openURL("https://narsingdibigganclub.xyz/")}>
                <Text style={styles.linkButton}>Official website</Text>
            </Pressable>
            <View style={styles.topSubContainer}>
                <View>
                    <Text style={styles.mainTitle}>Smarter AI</Text>
                    <Text style={styles.subTitle}>by, Narsingdi Biggan Club</Text>
                </View>
                <Image source={require("../assets/nbcLogo.png")} style={styles.topBanner} />
            </View>

            <View style={styles.chatBox}>
                {results.map((e, k) => (
                    <ScrollView key={k} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <Text style={styles.chatA}>{e.a}</Text>
                        <Text style={styles.chatB}>{e.b}</Text>
                    </ScrollView>
                ))}
            </View>

            <View>
                <View style={styles.itemCenter}>
                    <TextInput style={styles.mainInput} value={inputText} onChangeText={e => setInputText(e)} onKeyPress={({ nativeEvent }) => { if (nativeEvent.key === 'Enter') submitText() }} placeholder="I know EVERYTHING !" />
                </View>
                <View style={styles.itemCenter}>
                    <Pressable onPress={() => submitText()} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>ASK ME</Text>
                    </Pressable>
                    <Pressable onPress={() => setResults([])} style={styles.clearButton}>
                        <Text style={styles.submitButtonText}>CLEAR</Text>
                    </Pressable>
                </View>

                {!inputText.length && (
                    <>
                        <Text style={styles.suggestionsTitle}>Suggestions :</Text>
                        <View style={styles.suggestionsBox}>
                            <Pressable style={styles.suggestionsItem}>
                                <Text style={styles.suggestionsItemText}>Today's weather</Text>
                            </Pressable>
                            <Pressable style={styles.suggestionsItem}>
                                <Text style={styles.suggestionsItemText}>Today's weather</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 15,
        flex: 1,
        maxWidth: 500,
    },
    topSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    linkButton: {
        fontSize: 15,
        color: "blue",
        fontWeight: 800,
        paddingHorizontal: 10,
    },
    mainTitle: {
        fontSize: 35,
        fontWeight: 700,
        color: "#0fa875",
        textAlign: "center",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: "#0fa875",
        textAlign: "center",
    },
    topBanner: {
        height: 100,
        width: 100,
    },
    itemCenter: {
        alignItems: "center",
        justifyContent: "center",
    },
    chatBox: {
        maxHeight: 600,
    },
    chatA: {
        textAlign: "right",
        backgroundColor: "#5df0b8",
        maxWidth: 300,
        marginLeft: "auto",
        marginVertical: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        borderRadius: 7,
    },
    chatB: {
        textAlign: "left",
        backgroundColor: "#d5dedd",
        maxWidth: 300,
        marginRight: "auto",
        marginVertical: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        borderRadius: 7,
    },
    mainInput: {
        marginTop: 40,
        marginBottom: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#0fa875",
        fontSize: 20,
        borderRadius: 10,
        alignSelf: 'stretch',
        
    },
    submitButton: {
        backgroundColor: "#0fa875",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    clearButton: {
        backgroundColor: "#3a3d3c",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 800,
    },
    suggestionsTitle: {
        marginTop: 40,
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 500
    },
    suggestionsBox: {
        flexDirection: "row",
    },
    suggestionsItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#0fa875",
        margin: 4,
        borderRadius: 18
    },
    suggestionsItemText: {
        color: "#fff",
        fontWeight: 700
    }
});

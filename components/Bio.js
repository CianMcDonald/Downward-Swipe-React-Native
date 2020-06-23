import React from 'react'
import {Text, View, Image, StyleSheet, ScrollView, Dimensions} from "react-native";

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export default function Bio({route, navigation}) {

    return (
        <ScrollView style={{flex: 1}}>
            <Image
                style={styles.image}
                source={route.params.uri}
            />
            <View style={styles.containerDetails}>
                <Text
                    style={styles.header}
                >
                    Name, Age
                </Text>
                <Text
                    style={styles.course}
                >
                    Course
                </Text>
                <Text
                    style ={styles.bio}
                    >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices porta orci et accumsan. Maecenas pretium libero nec urna molestie maximus. Ut tempus metus non blandit mattis. Maecenas convallis eget metus sit amet consectetur. Integer interdum vitae urna sit amet auctor. Quisque congue consequat libero sed condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum non metus justo. Nullam pharetra convallis nulla nec aliquet. Phasellus sit amet sem dui. Duis lobortis ante at tortor congue, non ultricies dui pulvinar. Nunc elementum justo nec leo convallis, nec elementum orci tincidunt. Nulla consequat congue magna non faucibus.

                    Duis sit amet massa blandit est congue dictum. Donec justo lorem, elementum ac sagittis in, tincidunt in augue. Nulla nisl leo, ultricies posuere hendrerit finibus, elementum ac dolor. Vivamus et orci vel erat aliquet mattis eget in dolor. Mauris auctor nulla a risus pretium tempor. Nam lobortis vehicula erat, at auctor nunc auctor et. Fusce gravida metus eros, at accumsan elit fermentum eu. Mauris molestie nisl et ultrices condimentum. Sed ut risus ultricies, dapibus lacus id, viverra nulla. Phasellus sed lacus cursus, volutpat nisl et, tristique dolor. Ut venenatis mauris et ante gravida viverra. Nulla interdum arcu at nibh facilisis ultrices. Nulla et placerat orci, ut semper augue. Aenean congue orci sed fermentum rutrum. Sed mattis eros vitae lacus cursus, non lacinia magna condimentum. Nam faucibus, lorem at pretium efficitur, nisl magna pellentesque erat, sed congue metus nisl sit amet nunc.

                    Suspendisse consequat fringilla commodo. Maecenas euismod tincidunt libero. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales vehicula eros, in viverra sapien maximus ut. Praesent lacus ipsum, aliquet id tempus vel, consectetur condimentum nisi. Nulla facilisi. Fusce pellentesque arcu erat, in convallis lectus scelerisque id. Sed ex tortor, vehicula at orci et, cursus lobortis libero. Cras ipsum lectus, malesuada eu auctor in, semper quis lectus. In aliquam ipsum tellus, convallis accumsan mi scelerisque porttitor. Nulla facilisis eleifend risus eu posuere. Aliquam vel interdum magna.

                    Aenean interdum odio sed augue ullamcorper elementum. Nulla facilisi. Ut vehicula tristique porttitor. Cras libero ex, tristique id cursus bibendum, sagittis quis libero. Nam varius tellus libero. Ut fringilla sagittis volutpat. Nunc id odio vel quam lacinia porttitor aliquam id augue. Phasellus eget lorem lacinia turpis commodo sollicitudin bibendum sit amet lorem. Vestibulum ut placerat odio. Nulla ut molestie ipsum, quis ullamcorper est. Quisque auctor vel magna sit amet commodo.

                    Ut ac libero orci. Pellentesque id facilisis ex. Proin sed ultrices nulla. Pellentesque molestie et purus vitae vulputate. Donec id massa vitae purus imperdiet tempor id nec quam. Nunc tempus ante et sapien rhoncus dapibus. Nunc id bibendum ante. Sed posuere rutrum diam, vel molestie dolor maximus vulputate. Vivamus maximus ut velit quis fringilla. Ut ut vulputate ipsum, sodales accumsan turpis.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: screen_height/2,
        width: null,
        resizeMode: 'cover',
    },
    containerDetails: {
        flex: 1,
        padding: 10,

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    course: {
        fontSize: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    bio : {
        paddingTop:10,
        fontSize: 18,
    }
});
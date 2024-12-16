import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, Modal, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MissingIcon } from '@react-navigation/elements';

const { width, height } = Dimensions.get('window');
const Home = (props) => {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isSticky, setIsSticky] = useState(true);
    const [activeTab, setActiveTab] = useState('Post');
    const [dataPosts, setDataPosts] = useState([
        { email: "thuongtth@gmail.com", fullname: "Trương Thị Hoài Thương", id: 1, userName: "thuongtth" },
        { email: "thuongtth@gmail.com", fullname: "Trương Thị Hoài Thương", id: 1, userName: "thuongtth" }
    ]);
    const [page, setPage] = useState(1);
    const [dataAllPage, setDataAllPage] = useState(1)
    // const dataUser = props.route.params;
    const dataUser = { infoUser: { email: "thuongtth@gmail.com", fullname: "Trương Thị Hoài Thương", id: 1, userName: "thuongtth" } }
    const dataMenu = [
        { id: 1, text: 'Phát trực tiếp', imageitem:'user-add' },
        { id: 2, text: 'Vị trí' },
        { id: 3, text: 'Gắn thẻ' },
        { id: 4, text: 'Cảm xúc' },
    ]
    useEffect(() => {
        LoadData();
    }, [page])
    const LoadData = async () => {
        try {
            console.log('page loaddaaa', page)
            let rq = await fetch(`https://api-blue-archive.vercel.app/api/characters?page=${page}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            let rs = await rq.json();
         
            if (rs.message === 'success') {
                setDataAllPage(rs.dataAllPage)
                let listPosts = [];
                if (page > 1) listPosts = dataPosts
                listPosts.push(...rs.data);
                setDataPosts([...listPosts]);
            }
        }
        catch {

        }
    }
    const PostPress = () => { setActiveTab('Post') }
    const ImagePress = () => { setActiveTab('Image') }
    const VideoPress = () => { setActiveTab('Video') }
    const ItemMeunuPress = () => { Alert.alert('chưc năng'); }
    const menuRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={ItemMeunuPress} style={{ flexDirection: 'row', backgroundColor: '#F9FAFB', borderRadius: 20, height: 36, justifyContent: 'center', alignItems: 'center', borderColor: '#00000008', borderWidth: 1.5, gap: 3, paddingHorizontal: 10 }}>
                <Image source={IconResource.cameravideo} style={{ height: 13, width: 17 }} />
                <Text style={{ color: '#000', fontSize: 14 }}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
    const DetailPostPress =(data)=>{ console.log('data chuyển đi', data)
        navigation.navigate('PostDetailScreen', {data});
    }
    const renderItem_dataPosts = ({ item }) => {
        return (
            <ItemPost data={item} gotoDetailPost={DetailPostPress} />
        )
    }
    const LoadMore = () => {
        console.log(page)
        if (dataAllPage > page) {
            setPage(page + 1)
        }
    }
    const scrollY = new Animated.Value(0); // Value to track scroll position




    // Interpolation to translate the view up when user scrolls down
    const translateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -48], // Move the tab 48px up when scroll reaches 100px
        extrapolate: 'clamp', // Stop moving after 100px
    });


    // Handle scroll event to check if the menu should be sticky
    const onScrollToGhimMenuFunction = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                if (event.nativeEvent.contentOffset.y > 200) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            },
        }
    );



    return (
        <SafeAreaView style={[styles.container,]}>
            <View style={{ flexDirection: 'row', height: 40 }}>
                <TouchableOpacity >
                    <Image source={IconResource.chevronLeft} />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{dataUser.infoUser.fullname}</Text>
            </View>
            <ScrollView style={{ gap: 10 }}
                // contentContainerStyle={{ paddingTop: 100 }} // Add space to prevent overlap with sticky header
                onScroll={onScrollToGhimMenuFunction}
                scrollEventThrottle={16}
            >

                <Image source={ImagesResource.backBanner} style={{ height: 173, width: '100%' }} resizeMode='cover'></Image>
                <View style={styles.viewInfoUser}>
                    <Image source={ImagesResource.backBanner} style={{ height: 80, width: 80, borderRadius: 40 }} />
                    <View style={{ gap: 5 }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{dataUser.infoUser.fullname}</Text>
                            <Image source={IconResource.verified} style={{ height: 18, width: 18 }} resizeMode='contain'></Image>
                        </View>
                        <Text style={{ color: '#00000080' }}>{dataUser.infoUser.email}</Text>
                    </View>
                </View>
                <View style={{ marginTop: -45, flexDirection: 'row', width: '99%', justifyContent: 'center', alignItems: 'center', height: 40, gap: 10, }}>
                    <View style={{ flexDirection: 'row', gap: 2, }}>
                        <Text style={{ fontWeight: 'bold' }}>{'700K'}</Text>
                        <Text style={{ color: '#00000080' }}>{'Bạn bè'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                        <Text style={{ fontWeight: 'bold' }}>{'700K'}</Text>
                        <Text style={{ color: '#00000080' }}>{'Người theo dõi'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginBottom: 10 }}>
                    <TouchableOpacity style={{ height: 36, width: 117, borderRadius: 8, backgroundColor: '#3864FF', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}>{'Thêm tin'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 36, flex: 1, borderRadius: 8, borderWidth: 1.5, borderColor: '#00000008', backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 14 }}>{'Chỉnh sửa trang cá nhân'}</Text>
                    </TouchableOpacity>
                </View>
              
                {/* <Animated.View
                    style={[
                        styles.header,
                        isSticky && styles.stickyHeader, // Apply sticky style
                        { transform: [{ translateY }] },
                    ]}
                > */}
                    <View style={{ flexDirection: 'row', height: 48, gap: 20, backgroundColor: '#fff', paddingLeft: 10 }}>
                        <TouchableOpacity onPress={PostPress} style={activeTab === 'Post' ? styles.tabActive : styles.tab}>
                            <Text style={{ color: '#000', fontSize: 14 }}>Bài viết</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ImagePress} style={activeTab === 'Image' ? styles.tabActive : styles.tab}>
                            <Text style={{ color: '#000', fontSize: 14 }}>Ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={VideoPress} style={activeTab === 'Video' ? styles.tabActive : styles.tab}>
                            <Text style={{ color: '#000', fontSize: 14 }}>Video</Text>
                        </TouchableOpacity>
                    </View>
                {/* </Animated.View> */}
                <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 10, gap: 10, padding: 10 }}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>{'Bài viết của bạn'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                        <Image source={ImagesResource.backBanner} style={{ height: 40, width: 40, borderRadius: 20 }} />
                        <TextInput placeholder='Bạn đang nghĩ gì ' style={{ width: '85%' }} />
                        <Image source={IconResource.noImage} style={{}} />
                    </View>
                    <View style={{ height: 52 }}>
                        <FlatList
                            data={dataMenu}
                            renderItem={menuRenderItem}
                            onEndReached={LoadMore}
                            onEndReachedThreshold={0.1} // Trigger load more when reaching 10% from the bottom
                            scrollEnabled={!isSticky}  // Disable scroll when header is sticky
                            horizontal={true}
                            ItemSeparatorComponent={<View style={{ width: 12 }} />}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10 }}>
                    <FlatList
                        data={dataPosts}
                        renderItem={renderItem_dataPosts}
                        scrollEnabled={false}
                        ItemSeparatorComponent={<View style={{ height: 20 }} />}
                        onEndReachedThreshold={0.3}
                        onEndReached={LoadMore}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default Home;
const ItemPost = (props) => {
const GotoDetailPost =()=>{
    props.gotoDetailPost(props.data);
}
    const LikePress = () => {
    props.gotoLikePost(props.data);
     
    }
    let imageUserPost = ImagesResource.backBanner;
    if (GetObjectProperty(props.data, 'imageSchool') !== '') {
        imageUserPost = { uri: GetObjectProperty(props.data, 'imageSchool') }
    }
    let imagePost = ImagesResource.backBanner;
    if (GetObjectProperty(props.data, 'imageSchool') !== '') {
        imagePost = { uri: GetObjectProperty(props.data, 'photoUrl') }
    }
    return (
        <TouchableOpacity onPress={GotoDetailPost} style={{ padding: 10, gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image source={imageUserPost} style={{ height: 40, width: 40, borderRadius: 20 }} resizeMode='contain' />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text style={{ color: '#000', fontSize: 18 }}>{props.data.name}</Text>
                        <Image source={IconResource.verified} style={{ height: 16, width: 16 }} resizeMode='contain'></Image>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'@' + props.data.school}</Text>
                        <Text style={{ color: '#A3A3A3', fontSize: 12 }}>{'2 giờ'}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={IconResource.noImoreHorizmage} style={{ height: 18, width: 18, }} resizeMode='contain'></Image>
                </View>
            </View>
            <View>
                <Image source={imagePost} style={{ height: 418, width: width - 40, borderRadius: 20 }} resizeMode='contain'></Image>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={IconResource.heart} style={styles.iconAct} />
                    <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={IconResource.comment} style={styles.iconAct} />
                    <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={IconResource.share} style={styles.iconAct} />
                    <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LikePress} style={{ flexDirection: 'row', gap: 3, height: 36, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={IconResource.statistics} style={styles.iconAct} />
                    <Text style={{ color: '#000', fontSize: 14 }}>{'11K'}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: 16 }}>{'Nội dung Dân ca Quan họ là một trong những làn điệu dân ca tiêu biểu của vùng châu thổ sông Hồng ở miền Bắc Việt Nam.'}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', justifyContent: 'center', padding: 10 },
    viewInfoUser: {
        flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 16, borderWidth: 1, borderColor: '#3864FF', padding: 20, top: -50, height: 104, backgroundColor: '#FFF', marginHorizontal: 20,
        // Shadow styles for iOS
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 6, // Shadow for Android
            },
        }),
    },
    iconAct:{height:14, width:16},
    tab: { height: 48, justifyContent: 'center' },
    tabActive: { borderBottomColor: '#3864FF', borderBottomWidth: 2, height: 48, justifyContent: 'center' },
    errorText: {
        color: 'red',
        textAlign: 'left',
        fontSize: 12
    },
    header: {
        position: 'absolute',
       
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingTop: 10,
        zIndex: 1,
    },
    stickyHeader: {
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});
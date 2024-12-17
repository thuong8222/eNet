import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Animated, RefreshControl, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions, ScrollView, ImageBackground, FlatList } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';
import { GetObjectProperty, } from '../../utils/Helper';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { MissingIcon } from '@react-navigation/elements';
import ItemPost from '../../component/ItemPost'
const { width, height } = Dimensions.get('window');
const Home = (props) => {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const scrollView = useRef(null);
    const [currentY, setCurrentY] = useState(250);
    const [isRefreshingData, setIsRefreshingData] = useState(false);

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
        { id: 1, text: 'Phát trực tiếp', imageitem: 'cameravideo' },
        { id: 2, text: 'Vị trí', imageitem: 'location' },
        { id: 3, text: 'Gắn thẻ', imageitem: 'userAdd' },
        { id: 4, text: 'Cảm xúc', imageitem: 'smileEllipse' },
    ]
    useEffect(() => {
        LoadData();
    }, [page])
    const LoadData = async () => {
        try {

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
                <Image source={IconResource[item.imageitem]} style={{ height: 13, width: 17 }} resizeMode='contain' />
                <Text style={{ color: '#000', fontSize: 14 }}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
    const DetailPostPress = (data) => {
        navigation.navigate('PostDetailScreen', { data });
    }
    const renderItem_dataPosts = ({ item }) => {
        return (
            <ItemPost data={item} gotoDetailPost={DetailPostPress} />
        )
    }
    const LoadMore = () => {

        if (dataAllPage > page) {
            setPage(page + 1)
        }
    }

    const RefreshData = async () => {
        if (isRefreshingData === true) return;
        LoadData();
        setActiveTab('Post');
    }
    const CreatePost = () => {
        navigation.navigate('PostCreateScreen')
    }
    return (
        <SafeAreaView style={[styles.container,]}>
            <View style={{ flexDirection: 'row', height: 56, backgroundColor: '#fff', alignItems: 'center', paddingHorizontal: 10, }}>
                <TouchableOpacity >
                    <Image source={IconResource.chevronLeft} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>{dataUser.infoUser.fullname}</Text>
                </View>
            </View>
            <ScrollView style={{ flexGrow: 1, }}
                // onScroll={onScrollToGhimMenuFunction}
                scrollEventThrottle={16}
                ref={scrollView}
                refreshControl={<RefreshControl refreshing={false} onRefresh={RefreshData} />}
                stickyHeaderIndices={[2]}
            >

                <ImageBackground source={ImagesResource.backBanner} style={{ height: 173, width: '100%' }} resizeMode='cover'>
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
                </ImageBackground>

                <View style={{ backgroundColor: '#fff', marginBottom: 16, paddingTop: 60 }}>
                    <View style={{ paddingTop: -45, backgroundColor: '#fff', flexDirection: 'row', width: '99%', justifyContent: 'center', alignItems: 'center', height: 40, gap: 10, }}>
                        <View style={{ flexDirection: 'row', gap: 2, }}>
                            <Text style={{ fontWeight: 'bold' }}>{'700K'}</Text>
                            <Text style={{ color: '#00000080' }}>{'Bạn bè'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 2 }}>
                            <Text style={{ fontWeight: 'bold' }}>{'700K'}</Text>
                            <Text style={{ color: '#00000080' }}>{'Người theo dõi'}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 20, marginBottom: 10, }}>
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, height: 36, width: 117, borderRadius: 8, backgroundColor: '#3864FF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={IconResource.pluss} />
                            <Text style={{ color: '#fff', fontSize: 14 }}>{'Thêm tin'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 36, flex: 1, borderRadius: 8, borderWidth: 1.5, borderColor: '#00000008', backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: 14 }}>{'Chỉnh sửa trang cá nhân'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal style={{ height: 48, backgroundColor: '#fff', paddingLeft: 10, paddingHorizontal: 10, borderBottomColor: '#00000008', borderBottomWidth: 1, borderTopColor: '#00000008', borderTopWidth: 1 }}>
                    <TouchableOpacity onPress={PostPress} style={activeTab === 'Post' ? styles.tabActive : styles.tab}>
                        <Text style={{ color: '#000', fontSize: 14 }}>Bài viết</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={ImagePress} style={{width: 100, height: 42, alignItems: 'center', justifyContent: 'center'}}> */}
                    <TouchableOpacity onPress={ImagePress} style={activeTab === 'Image' ? styles.tabActive : styles.tab}>
                        <Text style={{ color: '#000', fontSize: 14 }}>Ảnh</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={VideoPress} style={activeTab === 'Video' ? styles.tabActive : styles.tab}>
                        <Text style={{ color: '#000', fontSize: 14 }}>Video</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 10, gap: 10, padding: 10 }}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>{'Bài viết của bạn'}</Text>
                    <TouchableOpacity onPress={CreatePost} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                        <Image source={ImagesResource.backBanner} style={{ height: 40, width: 40, borderRadius: 20 }} />
                        <TextInput placeholder='Bạn đang nghĩ gì ' style={{ width: '85%' }} />
                        <Image source={IconResource.noImage} style={{}} />
                    </TouchableOpacity>
                    <View style={{ height: 52 }}>
                        <FlatList
                            data={dataMenu}
                            renderItem={menuRenderItem}
                            horizontal={true}
                            ItemSeparatorComponent={<View style={{ width: 12 }} />}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10 }}>
                    <FlatList
                        data={dataPosts}
                        renderItem={renderItem_dataPosts}
                        keyExtractor={(_, index) => index.toString()}
                        //  scrollEnabled={false}
                        ItemSeparatorComponent={<View style={{ height: 20 }} />}
                        onEndReachedThreshold={0.3}
                        onEndReached={LoadMore}
                        scrollEnabled={false}  // Disable scroll when header is sticky
                    />
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default Home;

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', backgroundColor: '#f5f5f5' },
    viewInfoUser: {
        zIndex: 3,
        flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 16, borderWidth: 1, borderColor: '#3864FF', padding: 20, top: 130, height: 104, backgroundColor: '#FFF', marginHorizontal: 20,
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
    iconAct: { height: 14, width: 16 },
    tab: { height: 48, justifyContent: 'center', paddingRight: 10, justifyContent: 'center' },
    tabActive: { borderBottomColor: '#3864FF', paddingRight: 10, borderBottomWidth: 3, height: 48, justifyContent: 'center' },


});
import React, { useEffect, useState } from 'react';
import { NavigationRouteContext, useNavigation } from '@react-navigation/native';
import { SafeAreaView, Image, useColorScheme, Modal, KeyboardAvoidingView, TouchableOpacity, Text, View, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import IconResource from '../../assets/icon';
import ImagesResource from '../../assets/images';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const Login = (props) => {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const infoUser = {
        id: 1, userName: 'thuongtth', fullname: 'Trương Thị Hoài Thương', email: 'thuongtth@gmail.com'
    }
    const ToggleSecureTextEntry = () => {
        if (isSecureTextEntry === false) {
            setIsSecureTextEntry(true)
        } if (isSecureTextEntry === true) {
            setIsSecureTextEntry(false)
        }

    }
    const FogetPasWord = () => {
        Alert.alert('quên mật khẩu')
    }
    const SavePassWord = () => {
        Alert.alert('lưu mật khẩu')

    }
    const Register = () => {
        Alert.alert('đăng ký')

    }
    const Login = () => {
        try {
            if (userName.trim() === '') {
                setUsernameError('Tên người dùng không được để trống');
            } else {
                setUsernameError('');
            }
            if (passWord.trim() === '') {
                setPasswordError('Mật khẩu không được để trống');
            } else if (passWord.length < 6) {
                setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            } else {
                setPasswordError('');
            }
            if (userName === '' || passWord === '') { throw 'Tên người dùng hoặc mật khẩu không được để trống' };
            if (passWord.length < 6) { throw 'Mật khẩu phải có ít nhất 6 ký tự' };
            if (userName === 'thuongtth@gmail.com' && passWord === '123321') {
                Alert.alert('Thông báo', 'Đăng nhập thành công');
                console.log('infoUser', infoUser)
                navigation.navigate('HomeScreen', { infoUser })

            } else {
                Alert.alert('Thông tin đăng nhập không đúng');
            }
        }
        catch {

        }

    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme === 'dark' ? '#000' : '#f0f8ff' }]}>
            <KeyboardAvoidingView style={styles.viewKeyboardAvoidingView} >
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{'Đăng nhập tài khoản'}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 16 }}>{'Email, số điện thoại'}</Text>
                    <TextInput value={userName} onChangeText={setUserName} placeholder='hello@gmail.com' autoFocus placeholderTextColor={'#e3e3e3'} style={{ height: 40, width: '100%', borderRadius: 8, borderWidth: 1, borderColor: '#e3e3e3' }}></TextInput>
                </View>
                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16 }}>{'Mật khẩu'}</Text>
                    <View style={{ flexDirection: 'row', position: 'relative', height: 40, width: '100%', borderRadius: 8, borderWidth: 1, borderColor: '#e3e3e3' }}>
                        <TextInput value={passWord} onChangeText={setPassWord} secureTextEntry={isSecureTextEntry} placeholder='*******' autoFocus placeholderTextColor={'#e3e3e3'} style={{ height: 40, width: '100%', }}></TextInput>
                        <TouchableOpacity onPress={ToggleSecureTextEntry} style={{ height: 40, width: 40, position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {isSecureTextEntry ?
                                <Image source={IconResource.eyeOpen} />
                                :
                                <Text>{'hiện'}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity onPress={FogetPasWord} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16 }}>{'Quên mật khẩu?'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={SavePassWord} style={{ flex: 1,gap:5, flexDirection: 'row', width: '99%', justifyContent:'flex-end' }}>
                        <Image source={IconResource.noTick} />
                        <Text style={{ fontSize: 16,   }}>{'Ghi nhớ mật khẩu'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={Login} style={{ height: 36, width: '100%', backgroundColor: '#3864FF', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginVertical: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'auto' }}>{'Đăng nhập'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', color: '#9DA4AE' }}>{'hoặc'}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '99%', justifyContent: 'center', gap: 2 }}>
                    <Text style={{ textAlign: 'center', color: '#9DA4AE' }}>{'Bạn đã có tài khoản?'}</Text>
                    <TouchableOpacity onPress={Register}>
                        <Text style={{ color: '#3864FF' }}>{'Đăng ký'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>


        </SafeAreaView>

    )
}
export default Login;
const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', justifyContent: 'center', padding: 10 },
    viewKeyboardAvoidingView: { height: '100%', width: '100%', alignContent: 'center', justifyContent: 'center', padding: 2, gap: 5 },
    title: { paddingTop: 40, paddingBottom: 30 },
    titleText: { fontSize: 20, fontSize: 32, fontWeight: 'bold', color: '#0673D8', fontFamily: 'Arial', },
    groupInput: { width: '100%', alignItems: 'center', gap: 10 },
    input: { width: '80%', paddingHorizontal: 5, flexDirection: 'row', alignItems: 'center', borderColor: '#0673D8', borderWidth: .8, borderRadius: 10 },
    groupBtn: { width: '100%', alignItems: 'center', marginTop: 40 },
    btnForgetPW: { alignItems: 'flex-end', width: '80%', padding: 10 },
    btn: { height: 50, width: '80%', borderRadius: 10, backgroundColor: '#0673D8', justifyContent: 'center', alignItems: 'center' },

    centeredView: { flex: 1, justifyContent: 'flex-end', },
    modalView: {
        width: '100%', height: '80%', borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 35, alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
        fontSize: 12
    },
});
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function SetProvinceInfo(data) {
    await AsyncStorage.setItem('ProvinceData', JSON.stringify(data));
}
export async function GetProvinceInfo() {
    try {
        var dataString = await AsyncStorage.getItem('ProvinceData');
        if (dataString !== '' && dataString !== null && typeof dataString !== 'undefined') {
            return JSON.parse(dataString);
        }
    }
    catch (ex) { return null; }
    return null;
}
export async function SetDistrictInfo(data) {
    await AsyncStorage.setItem('districtData', JSON.stringify(data));
}
export async function GetDistrictInfo() {
    try {
        var dataString = await AsyncStorage.getItem('districtData');
        if (dataString !== '' && dataString !== null && typeof dataString !== 'undefined') {
            return JSON.parse(dataString);
        }
    }
    catch (ex) { return null; }
    return null;
}

export async function SetAreaInfo(data) {
    await AsyncStorage.setItem('AreaData', JSON.stringify(data));
}
export async function GetAreaInfo() {
    try {
        var dataString = await AsyncStorage.getItem('AreaData');
        if (dataString !== '' && dataString !== null && typeof dataString !== 'undefined') {
            return JSON.parse(dataString);
        }
    }
    catch (ex) { return null; }
    return null;
}
export async function SetBranchInfo(data) {
    await AsyncStorage.setItem('BranchData', JSON.stringify(data));
}
export async function GetBranchInfo() {
    try {
        var dataString = await AsyncStorage.getItem('BranchData');
        if (dataString !== '' && dataString !== null && typeof dataString !== 'undefined') {
            return JSON.parse(dataString);
        }
    }
    catch (ex) { return null; }
    return null;
}
export async function SetCourseInfo(data) {
    await AsyncStorage.setItem('CourseData', JSON.stringify(data));
}
export async function GetCourseInfo() {
    try {
        var dataString = await AsyncStorage.getItem('CourseData');
        if (dataString !== '' && dataString !== null && typeof dataString !== 'undefined') {
            return JSON.parse(dataString);
        }
    }
    catch (ex) { return null; }
    return null;
}

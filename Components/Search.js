import React from 'react'
import {View, Button, TextInput, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.page = 0
        this.totalPages= 0
        this.searchedText=""
        this.state = {
            films: [],
            isLoading: false
            
        }
    }
    _loadFilms() {
        if (this.searchedText.length>0){
            this.setState({isLoading: true});
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data =>{
                this.page= data.page
                this.totalPages= data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
                

            })
        }
    }
    _searchTextInputChanged(text){
        this.searchedText = text
    }
    _displayLoading(){
        if (this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }
    _searchFilms(){
        this.page = 0
        this.totalPages= 0
        this.setState({
            films:[]
        }, () => {
            this._loadFilms()
        })
        
    }
    render(){
        
        return(
            <View style={styles.main_container}>
                <TextInput placeholder="Titre du film" style={styles.textinput, {backgroundColor: '#ffffff'}} onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._searchFilms()}/>
                <Button title="Rechercher" color= '#ff0000' onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.page < this.totalPages){
                            this._loadFilms()
                        }
                    } }
                 />
                 {this._displayLoading()}
            </View> 
            
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex:1, 
        marginTop: 20, 
        backgroundColor: '#8b0000'
        
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5, 
        height: 50,
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    keyText: {
        fontSize: 23,
        color: '#ffffff'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
});
export default Search
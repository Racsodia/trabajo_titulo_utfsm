import React from 'react';
import {MDBContainer,MDBRow,MDBCol,Fa,MDBBtn} from 'mdbreact';
import RichTextEditor from 'react-rte';
import axios from 'axios';
import urls from '../URLs'
import ExplorePreview from '../components/ExplorePreview';

import { Query, Mutation } from "react-apollo";
import { EXPLORE, ARTICLE_CREATE } from '../queries';
import Loading from '../components/Loading';

import { CATEGORY_MUTATION, SUBCATEGORY_MUTATION, ARTICLE_MUTATION, DELETE_ARTICLE, EDIT_ARTICLE, DELETE_FIGURE, EDIT_FIGURE } from '../mutations';

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figureTitle: props.figureTitle,
            figureContext: props.figureContext,
            header_url: props.header_url,
            icon_url: props.icon_url,
            /* img_url: props.img_url, */
            content: props.content,
            article: props.article,
            article_id: props.article_id,
            category_id: props.category_id,
            subcategory_id: props.subcategory_id,
            value: RichTextEditor.createEmptyValue(),
            categories:[],
            subCategories:[],
            figures:[],
            articles: [],
            title: '',
            category:'',
            subCategory: '',
            color: '0',
            figureId: '0',
            showPrev: false,
            editButton: false,
        };
    }

    redirect = (cache, {data: {newArticle}}) => {
        window.location.href = "../explorar/"+newArticle.id
    }
    updateCacheCategory = (cache, {data: {newCategory}}) => {
        const {categories} = cache.readQuery({query: ARTICLE_CREATE})
        cache.writeQuery({
            query: ARTICLE_CREATE,
            data: {
                categories: { data: categories.data.concat(newCategory), __typename: "categoryPagination" }
            }
        })
    }
    updateCacheSubcategory = (cache, {data: {newSubcategory}}) => {
        const {subcategories} = cache.readQuery({query: ARTICLE_CREATE})
        cache.writeQuery({
            query: ARTICLE_CREATE,
            data: {
                subcategories: { data: subcategories.data.concat(newSubcategory), __typename: "subcategoryPagination" }
            }
        })
    }
    updateArticleDelete = (cache, {data: {deleteArticle}}) => {
        const {articles} = cache.readQuery({query: ARTICLE_CREATE})
        cache.writeQuery({
            query: ARTICLE_CREATE,
            data: {
                articles: { data: articles.data.filter(a =>{ return (a.id != deleteArticle)}), __typename: "articlePagination" }
            }
        })
        const newArticles = cache.readQuery({query: ARTICLE_CREATE})
        this.setState({
                newArticles,
                title: '',
                color: '',
                content: '' ,
                photo_uri: '' ,
                icon_uri: '' ,
        })
    }
    onChange = (value) => {
        this.setState({value,content: value.toString('html'),showPrev:false})
         if (this.props.onChange) {
            this.props.onChange(
              value.toString('html')
            );
          }
    }
    handleHeaderFile = e => {
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])
        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response => {
            this.setState({header_url: response.data.uri})
            alert("fdfd")
        })
        .catch(error => {console.log(error)})
    }
    handleIconFile = e => {
        let formdata = new FormData()
        formdata.append('file',e.target.files[0])
        axios.post(urls.prefix + urls.docsCreate, formdata, { headers: { Authorization: `Bearer ${localStorage.getItem("tk")}`}})
        .then(response => {
            this.setState({icon_url: response.data.uri})
            alert("hgd")
        })
        .catch(error => {console.log(error)})
    }
    /* handleImgFile = e => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('access_token',localStorage.getItem("tk"))
        formdata.append('file',e.target.files[0])

        axios.post(urls.prefix + urls.docsCreate,formdata)
        .then(response => {
            this.setState({img_url: response.data.uri})
        })
        .catch(error => {console.log(error)})
    } */
    handleTitleChange = e => {
        this.setState({title: e.target.value,showPrev:false})
    }
    handleCategory = e => {
        this.setState({category: e.target.value,showPrev:false})
    }
    handleSubcategory = e => {
        this.setState({subCategory: e.target.value,showPrev:false})
    }
    createCategory = categories => {
        for(let i=0;i<categories.length;i++){
            if(this.state.category == categories[i].name){
                alert("Esta categoria ya existe")
                this.setState({category: ''})
                return false
            }
        }

        if(window.confirm("Confirme que desea crear nueva categoría")) return true
    }
    createSubCategory = (subCategories) => {
        var flag = false
        if(this.state.category_id == 0 || typeof this.state.category_id == 'undefined'){
            alert("Debe seleccionar una categoría primero")
            flag =true
            this.setState({subCategory: ''})
        }
        for(let i=0;i<subCategories.length;i++){
            if(this.state.subCategory == subCategories[i].name){
                alert("Esta sub categoria ya existe")
                flag = true;
                this.setState({subCategory: ''})
            }
        }

        if (flag == false) if(window.confirm("Confirme que desea crear nueva sub categoría")) return true
        return false
    }
    handleCategoryID = e => {
        this.setState({category_id: e.target.value,category: '',showPrev:false})
    }
    handleSubcategoryID = e => {
        this.setState({subcategory_id: e.target.value, subCategory: '', showPrev:false})
    }
    handleColor = e => {
        this.setState({color: e.target.value,showPrev:false})
    }
    handleFigureTitle= e=> {
        this.setState({figureTitle: e.target.value,showPrev:false})
    }
    handleContext = e => {
        this.setState({figureContext: e.target.value,showPrev:false})
    }
    handleFigure = e => {
        e.preventDefault()
        this.setState(state => {
            const figures = [...state.figures,{figure:state.figureTitle, context:state.figureContext}]
            return{
                figures,
                showPrev:false,
                figureTitle: '',
                figureContext: ''
            }
        })
    }
    handleEditFigure = e => {
        this.setState({
            figureTitle: e.figure,
            figureContext: e.context,
            figureId: e.id,
            editFigureButton: true
        })
    }
    deleteFigure = i => {
        this.setState(state => {
            const figures = state.figures.filter(f => f.id !== i);
            return {
                figures,
                showPrev:false
            }
        })
    }
    handlePreview = e => {
        e.preventDefault()
        let article =
        {
            title: this.state.title,
            color: this.state.color,
            content: this.state.content,
            photo_uri: this.state.header_url,
            icon_uri: this.state.icon_url,
            figures: this.state.figures,
        }
        this.setState({article: article, showPrev: true})
    }
    handleUpload = (a) => {
        if (typeof a == 'undefined' || a == null || a == 0 || a == '0' || a == []) return false
        return true
    }
    handleUploadArticleEdit = () => {
        window.location.href = "../explorar/"+this.state.article_id
        this.setState({
            title: '',
            category_id: 0,
            subcategory_id: 0,
            color: 0,
            header_url: '',
            icon_url: '',
            value: RichTextEditor.createValueFromString('','html'),
            figures: [],
            editButton: false,
            article_id: ''
        })
    }
    handleUploadFigureEdit = (cache, {data: {editFigure}}) => {
        let {articles} = cache.readQuery({query: ARTICLE_CREATE})
        articles.data[0].figures.map(a => {
            if (a.id == editFigure.id) {
                a.figure = editFigure.figure
                a.context = editFigure.context
            }
        })
        console.log(articles)
        cache.writeQuery({
            query: ARTICLE_CREATE,
            data: articles
        })
        let figures = articles.data[0].figures
        console.log('chache',cache.readQuery({query: ARTICLE_CREATE}))
        this.setState({
            figureTitle: '',
            figureContext: '',
            figureId: '0',
            editFigureButton: false,
            figures: figures,
            editFigureButton: false
        })
    }
    editArticle = (a) => {
        this.setState({
            title: a.title,
            content: a.content,
            category_id: a.category.id,
            subcategory_id: a.subcategory.id,
            color: a.color,
            header_url: a.photo_uri,
            icon_url: a.icon_uri,
            value: RichTextEditor.createValueFromString(a.content,'html'),
            figures: a.figures,
            editButton: true,
            article_id: a.id
        })
    }
    dataFormat = (id) => {
        let flag = true

        let category_id = this.state.category_id
        let subcategory_id = this.state.subcategory_id
        let title = this.state.title
        let content = this.state.content
        let color = this.state.color
        let photo_uri = this.state.header_url
        let icon_uri = this.state.icon_url
        let figures = this.state.figures
        let data = {}
        
        if (this.handleUpload(id)) data['id'] = this.state.article_id
        if (this.handleUpload(category_id)) data['category_id'] = parseInt(category_id)
        else flag = false
        if (this.handleUpload(subcategory_id)) data['subcategory_id'] = parseInt(subcategory_id)
        else flag = false
        if (this.handleUpload(title)) data['title'] = title
        else flag = false
        if (this.handleUpload(content)) data['content'] = content
        else flag = false

        if (this.handleUpload(color)) data = Object.assign(data,{color: color})
        if (this.handleUpload(photo_uri)) data = Object.assign(data,{photo_uri: photo_uri})
        if (this.handleUpload(icon_uri)) data = Object.assign(data,{icon_uri: icon_uri})
        if (this.handleUpload(figures)) data = Object.assign(data,{figures: figures})

        return {data, flag}
    }
    render() {
        return (
            <Query query = {ARTICLE_CREATE}>
                {({loading, error, data: {articles, categories, subcategories}}) => {
                    if (loading) return <Loading/>
                    if (error) return 'Error'

                    articles = articles.data
                    categories = categories.data
                    subcategories = subcategories.data

                    return (
                        <MDBContainer className="pt-5">
                            <MDBContainer className="pt-5">
                                <MDBContainer>
                                    <h5>Temáticas creadas: </h5>
                                    {articles.map(e => {
                                        return (
                                            <MDBRow key={e.id}>
                                                <MDBCol size="sm-1">{e.id}</MDBCol>
                                                <MDBCol size="sm-3">{e.title}</MDBCol>
                                                <MDBCol size="sm-2"><button onClick={()=>this.editArticle(e)}>Editar</button></MDBCol>
                                                <Mutation mutation = {DELETE_ARTICLE} update = {this.updateArticleDelete}>
                                                    { deleteArticle => <MDBCol size="sm-2"><button value onClick={()=> {
                                                        if (window.confirm("¿Confirma que desea eliminar esta temática?")) {
                                                            deleteArticle({variables: {id: e.id}})
                                                        }
                                                    }}>Eliminar</button></MDBCol>}
                                                </Mutation>
                                            </MDBRow>
                                        )
                                    })}
                                </MDBContainer>
                                <form>
                                    <MDBRow>
                                        <MDBCol size="sm-8">
                                            <input type="text "
                                                placeholder=" * Título (max. 40 caracteres)"
                                                className ="title w-100"
                                                maxLength="40"
                                                value={this.state.title}
                                                onChange={this.handleTitleChange}
                                            />
                                        </MDBCol>
                                        <MDBCol size="sm-4">
                                            <label className="file-btn-1" >
                                                <Fa icon="far fa-file" />Header
                                                <input type="file" onChange={this.handleHeaderFile}/>
                                            </label>
                                            <label className="file-btn-1" >
                                                <Fa icon="far fa-file" />Ícono
                                                <input type="file" onChange={this.handleIconFile}/>
                                            </label>
                                            {/* <label className="file-btn-1" >
                                                <Fa icon="far fa-file" /> Imagen
                                                <input type="file" onChange={this.handleImgFile}/>
                                            </label> */}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol size="sm-2">
                                            <select value={this.state.category_id} onChange={this.handleCategoryID}>
                                                <option value="0">* Categoría</option>
                                                {categories.map(c => {
                                                    return <option key={c.id} value={c.id}>{c.name}</option>
                                                })}
                                            </select>
                                        </MDBCol>
                                        <MDBCol size="sm-5">
                                            <input type="text "
                                                placeholder="Crear categoría (max. 40 caracteres)"
                                                className ="title w-100"
                                                maxLength="40"
                                                value={this.state.category}
                                                onChange={this.handleCategory}
                                            />
                                        </MDBCol>
                                        <MDBCol size="1">
                                            <Mutation mutation = {CATEGORY_MUTATION} update = {this.updateCacheCategory}>
                                                {newCategory => <button onClick = {
                                                    (e) => {
                                                        e.preventDefault()
                                                        if (this.createCategory(categories)) newCategory({variables: {name: this.state.category}})
                                                    }
                                                }>Crear</button> }
                                            </Mutation>
                                        </MDBCol>
                                        <MDBCol size="4">
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol size="sm-2">
                                            <select value={this.state.subcategory_id} onChange={this.handleSubcategoryID}>
                                            <option value="0">* Sub categoría</option>
                                            {
                                                subcategories.map(e => {
                                                    return(
                                                        <option key={e.id} value={e.id}>{e.name}</option>
                                                    )
                                                })
                                            }
                                            </select>
                                        </MDBCol>
                                        <MDBCol size ="sm-5">
                                            <input type="text "
                                                placeholder="Crear subcategoría (max. 40 caracteres)"
                                                className ="title w-100"
                                                maxLength="40"
                                                value={this.state.subCategory}
                                                onChange={this.handleSubcategory}
                                            />
                                        </MDBCol>
                                        <MDBCol size="1">
                                            <Mutation mutation = {SUBCATEGORY_MUTATION} update = {this.updateCacheSubcategory}>
                                                {newSubcategory => <button onClick = {
                                                    (e) => {
                                                        e.preventDefault()
                                                        if (this.createSubCategory(subcategories)) newSubcategory({variables: {category_id: this.state.category_id, name: this.state.subCategory}})
                                                    }
                                                }>Crear</button> }
                                            </Mutation>
                                        </MDBCol>
                                        <MDBCol size ="sm-4">
                                            <select value = {this.state.color} onChange={this.handleColor}>
                                                <option value="0">Seleccionar color</option>
                                                <option value="bg00" className="bg00">Fondo 1</option>
                                                <option value="bg01" className="bg01">Fondo 2</option>
                                                <option value="bg02" className="bg02">Fondo 3</option>
                                                <option value="bg03" className="bg03">Fondo 4</option>
                                                <option value="bg04" className="bg04">Fondo 5</option>
                                                <option value="bg05" className="bg05">Fondo 6</option>
                                                <option value="bg06" className="bg06">Fondo 7</option>
                                                <option value="bg07" className="bg07">Fondo 8</option>
                                                <option value="bg08" className="bg08">Fondo 9</option>
                                                <option value="bg09" className="bg09">Fondo 10</option>
                                            </select>
                                        </MDBCol>
                                    </MDBRow>
                                    {this.state.header_url && <MDBRow className="pl-3"> Header URL: <a href={this.state.header_url} target ="_blank" >{this.state.header_url}</a></MDBRow>}
                                    {this.state.icon_url && <MDBRow className="pl-3"> Ícono URL: <a href={this.state.icon_url} target ="_blank">{this.state.icon_url}</a></MDBRow>}
                                    {/* {this.state.img_url && <MDBRow className="pl-3"> Imagen URL: <a href={this.state.img_url} target ="_blank">{this.state.img_url}</a></MDBRow>} */}
                                    <MDBRow>
                                        <MDBCol size="sm-8">
                                            <RichTextEditor
                                                value = {this.state.value}
                                                onChange = {this.onChange}
                                                placeholder = {'*'}
                                                toolbarConfig = {{
                                                    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
                                                    INLINE_STYLE_BUTTONS: [
                                                        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                                                        {label: 'Italic', style: 'ITALIC'},
                                                        {label: 'Underline', style: 'UNDERLINE'}
                                                    ],
                                                    BLOCK_TYPE_DROPDOWN: [
                                                        {label: 'Normal', style: 'unstyled'},
                                                        {label: 'Grande', style: 'header-one'},
                                                        {label: 'Medio', style: 'header-two'},
                                                        {label: 'Pequeño', style: 'header-three'}
                                                    ],
                                                    BLOCK_TYPE_BUTTONS: [
                                                        {label: 'UL', style: 'unordered-list-item'},
                                                        {label: 'OL', style: 'ordered-list-item'}
                                                    ]
                                                }}
                                            />
                                            <span className = 'acotacion'>*&nbsp;&nbsp;Campos requeridos</span>
                                        </MDBCol>
                                        <MDBCol size="sm-4">
                                        {/* <p> Importante:</p>
                                        <p> Al subir un header, ícono o imagen se mostrará la URL para revisarla.
                                            El header y el ícono aparecerán automáticamente cuando se publique el artítulo,
                                            sin embargo, la URL de la imagen se debe copiar en el elemento del menú del
                                            editor de texto para que sea mostrada dentro del contenido del artículo.
                                            Si se desea agregar más de una imagen basta con volver a subirla con el botón "Imagen"
                                            y copiar la nueva URL. El tamaño de la imágen a subir debe ser exacto como se desea visualizar ya que este no será responsivo. Considerar un ancho máximo de 360 píxeles
                                        </p> */}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol size="sm-6">
                                            <br/>
                                            <p>Cifras</p>
                                            <input
                                                placeholder="Título (max. 100 caracteres)"
                                                className ="title w-100"
                                                maxLength="100"
                                                value={this.state.figureTitle}
                                                onChange={this.handleFigureTitle}
                                            />
                                            <textarea
                                                placeholder="Detalle (max. 5000 caracteres)"
                                                cols="53"
                                                maxLength="5000"
                                                className="figure-textarea"
                                                value={this.state.figureContext}
                                                onChange={this.handleContext}
                                            />
                                            <button onClick={this.handleFigure}>Agregar cifra</button>
                                            <button onClick={this.handlePreview}>Vista previa</button>
                                            <Mutation mutation = {ARTICLE_MUTATION} update = {this.redirect}>
                                                {(newArticle, {loading, error}) => {
                                                    if (error) console.log(`Error! ${error.message}`)
                                                    return(
                                                        <button onClick={
                                                            (e) => {
                                                                e.preventDefault()
                                                                let {data, flag} = this.dataFormat()
                                                                if (!flag) alert('Debes ingresar todos los campos obligatorios')
                                                                else if (window.confirm("¿Desea subir el artículo?")) {
                                                                    newArticle({variables: data})
                                                                    this.setState({category_id: 0, subcategory_id: 0, title: '', content: '', color: '0', photo_uri: '', icon_uri: '', titleValue: '', contextValue: ''})
                                                                }
                                                            }
                                                        }>Subir temática</button>
                                                    )
                                                }}
                                            </Mutation>
                                            {this.state.editButton &&
                                            <Mutation mutation = {EDIT_ARTICLE} update = {this.handleUploadArticleEdit}>
                                                {editArticle => <button onClick={
                                                    (e) => {
                                                        e.preventDefault()
                                                        let {data} = this.dataFormat(this.state.article_id)
                                                        if(window.confirm('¿Guardar cambios?')) editArticle({variables: data})
                                                    }
                                                }>Editar temática</button>}
                                            </Mutation>}
                                            {this.state.editFigureButton &&
                                            <Mutation mutation = {EDIT_FIGURE} update = {this.handleUploadFigureEdit}>
                                                {editFigure => <button onClick={e => {
                                                    e.preventDefault()
                                                    let data = {id: this.state.figureId, article_id: this.state.article_id, figure: this.state.figureTitle, context: this.state.figureContext}
                                                    if(window.confirm('¿Guardar cambios?')) editFigure({variables: data})
                                                }}>Editar cifra</button>}
                                            </Mutation>}
                                        </MDBCol>
                                        <MDBCol size="sm-6">
                                            {this.state.figures.map((e) => {
                                                return (
                                                    <MDBRow key={e.id}>
                                                        <MDBCol>
                                                            {e.figure}
                                                        </MDBCol>
                                                        <MDBCol>
                                                            {e.context}
                                                        </MDBCol>
                                                        <MDBCol>
                                                            <a onClick={ () => this.handleEditFigure(e) }>Editar</a>
                                                        </MDBCol>
                                                        <MDBCol>
                                                            <Mutation mutation = {DELETE_FIGURE}>
                                                                {deleteFigure => <a onClick={()=>{
                                                                    if(window.confirm('¿Desea eliminar esta cifra?')) {
                                                                        deleteFigure({variables: {id: e.id}})
                                                                        this.deleteFigure(e.id)
                                                                    }
                                                                }}>Eliminar</a>}
                                                            </Mutation>
                                                        </MDBCol>
                                                    </MDBRow>
                                                )
                                            })}
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </MDBContainer>
                            {this.state.showPrev && <ExplorePreview article = {this.state.article}></ExplorePreview>}
                        </MDBContainer>
                    )
                }}
            </Query>
        )
    }
}

export default ArticleCreate;

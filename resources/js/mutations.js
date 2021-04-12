import {gql} from 'apollo-boost'

export const CREATE_KNOWLEDGE = gql`
    mutation newPublication ($title: String!, $content: String!, $article_id: Int!, $doc_uri: String) {
        newPublication (title: $title, content: $content, article_id: $article_id, doc_uri: $doc_uri) {
            id
            title
            content
            comments_count
            likes_count
            doc_uri
            user {
                id
            }
            article {
                id
            }
            created_at
            updated_at
        }
    }
`
export const DELETE_PUBLICATION = gql`
    mutation deletePublication ($id: Int!) {
        deletePublication (id: $id)
    }
`

export const DELETE_CHALLENGE = gql`
    mutation deletePublication ($id: Int!) {
        deleteChallenge (id: $id)
    }
`
export const CREATE_CHALLENGE = gql`
    mutation newChallenge ($challengeable_type: String!, $challengeable_id: Int!, $context: String!, $challenge: String!, $as_organization: Boolean!, $target: String, $name: String, $evaluation: String, $doc_uri: String) {
        newChallenge (challengeable_type: $challengeable_type, challengeable_id: $challengeable_id, context: $context, challenge: $challenge, as_organization: $as_organization, target: $target, name: $name, evaluation: $evaluation, doc_uri: $doc_uri) {
            id
            user {
                id
            }
            context
            challenge
            comments_count
            likes_count
            created_at
            doc_uri
        }
    }
`
export const TOGGLE_LIKE = gql`
    mutation toggleLike ($type: String!, $id: Int!) {
        toggleLike (likeable_type: $type, likeable_id: $id)
    }
`
export const DELETE_COMMENT = gql`
    mutation deleteComment ($id: Int!) {
        deleteComment (id: $id)
    }
`
export const CREATE_COMMENT = gql`
    mutation newComment ($type: String!, $id: Int!, $content: String!, $doc_uri: String) {
        newComment (commentable_type: $type, commentable_id: $id, content: $content, doc_uri: $doc_uri) {
            id
            user {
                id
            }
            content
            doc_uri
            likes_count
            updated_at
            created_at
            commentable_type
            commentable_id
        }
    }
`
export const CREATE_PROJECT = gql`
    mutation newProject ($name: String!, $org: Int!, $context: String!, $status: String, $article: Int, $photo_uri: String) {
        newProject (name: $name, organization_id: $org, context: $context, status: $status, article_id: $article, photo_uri: $photo_uri) {
            id
            name
            photo_uri
            context
            status
            organization {
                id
                name
                photo_uri
            }
            article {
                id
            }
            user {
                id
                name
            }
            article {
                id
            }
        }
    }
`
export const EDIT_PROJECT = gql`
    mutation editProject($id: Int!, $name: String!, $org: Int!, $context: String!, $status: String, $article: Int, $photo_uri: String) {
        editProject(id: $id, name: $name, organization_id: $org, context: $context, status: $status, article_id: $article, photo_uri: $photo_uri) {
            id
            name
            photo_uri
            context
            status
            user {
                id
                name
            }
            organization {
                id
                name
                photo_uri
            }
            article {
                id
            }
        }
    }
`
export const DELETE_PROJECT = gql`
    mutation deleteProject ($id: Int!) {
        deleteProject (id: $id)
    }
`
export const FOLLOW_MUTATION = gql`
    mutation followMutation ($id: Int!) {
        toggleArticleFollow (id: $id)
    }
`
export const CATEGORY_MUTATION = gql`
    mutation newCategory ($name: String!) {
        newCategory (name: $name) {
            id
            name
        }
    }
`
export const SUBCATEGORY_MUTATION = gql`
    mutation newSubcategory ($category_id: Int!, $name: String!) {
        newSubcategory (category_id: $category_id, name: $name) {
            id
            name
        }
    }
`
export const ARTICLE_MUTATION = gql`
    mutation newArticle ($category_id: Int!, $subcategory_id: Int!, $title: String!, $content: String!, $color: String, $photo_uri: String, $icon_uri: String, $figures: [FigureObjectType]) {
        newArticle (category_id: $category_id, subcategory_id: $subcategory_id, title: $title, content: $content, color: $color, photo_uri: $photo_uri, icon_uri: $icon_uri, figures: $figures) {
            id
            user {
                id
            }
        }
    }
`
export const TOGGLE_FOLLOW = gql`
    mutation toggleFollow ($id: Int!) {
        toggleFollow (id: $id)
    }
`
export const ORG_CREATE = gql`
    mutation newOrganization ($name: String!, $mission: String!, $description: String!, $vision: String!, $photo_uri: String!, $webpage: String!){
        newOrganization (name: $name, mission: $mission, description: $description, vision: $vision, photo_uri: $photo_uri, webpage: $webpage) {
            id
            photo_uri
            name
            description
            webpage
        }
    }
`
export const DELETE_ORG = gql`
    mutation deleteOrganization ($id: Int!) {
        deleteOrganization (id: $id)
    }
`
export const EDIT_ORG = gql`
    mutation editOrganization ($id: Int!, $name: String, $mission: String, $vision: String, $description: String, $photo: String, $web: String) {
        editOrganization (id: $id, name: $name, mission: $mission, vision: $vision, description: $description, photo_uri: $photo, webpage: $web) {
            id
            photo_uri
            name
            description
            webpage
        }
    }
`
export const EDIT_USER = gql`
    mutation editUser ($id: Int!, $organization_id: Int, $position: String, $verified: String, $org_admin: String, $type: String) {
        editUser (id: $id, organization_id: $organization_id, position: $position, verified: $verified, org_admin: $org_admin, type: $type) {
            id
            name
            position
            photo_uri
            type
            org_admin
            verified
            organization {
                id
                name
            }
        }
    }
`
export const DELETE_USER = gql`
    mutation deleteUser ($id: Int!) {
        deleteUser (id: $id)
    }
`
export const DELETE_ARTICLE = gql`
    mutation deleteArticle ($id: Int!) {
        deleteArticle (id: $id)
    }
`
export const EDIT_ARTICLE = gql`
    mutation editArticle ($id: Int!, $category_id: Int, $subcategory_id: Int, $title: String, $content: String, $color: String, $photo_uri: String, $icon_uri: String) {
        editArticle (id: $id, category_id: $category_id, subcategory_id: $subcategory_id, title: $title, content: $content, color: $color, photo_uri: $photo_uri, icon_uri: $icon_uri) {
            id
        }
    }
`
export const DELETE_FIGURE = gql`
    mutation deleteFigure ($id: Int!) {
        deleteFigure (id: $id)
    }
`
export const EDIT_FIGURE = gql`
    mutation editFigure ($id: Int!, $article_id: Int, $figure: String, $context: String) {
        editFigure (id: $id, article_id: $article_id, figure: $figure, context: $context) {
            id
            figure
            context
        }
    }
`

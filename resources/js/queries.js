import {gql} from 'apollo-boost'

export const HOME = gql`{
    articles {
        data {
            id
            color
            title
            icon_uri
        }
    }
    organizations {
        total
        current_page
        last_page
        data {
            id
            photo_uri
            name
            description
            webpage
        }
    }
}`

export const MOST_COMMENT_CHALLENGES = gql`{
    challenges (limit: 5, page: 1) {
        data {
            id
            likes_count
            comments_count
            doc_uri
            user {
                id
            }
            created_at
            context
            challenge
        }
    }
}`

export const PUBLICATIONS_PAGE = gql`{
    publications (sortByDesc: "updated_at") {
        data {
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
}`

export const ARTICLES_ALBUM = gql`query Articles {
    articles {
        data {
            id
            title
            color
        }
    }
}`

export const MOST_COMMENTED_PUBLICATIONS = gql`{
    publications (sortByDesc: "comments_count", limit: 5, page: 1) {
        data {
            id
            title
            content
            likes_count
            comments_count
            doc_uri
            user {
                id
            }
            created_at
            updated_at
        }
    }
}`

export const PROJECTS_ALBUM = gql`query Projects {
    projects {
        data {
            id
            name
        }
    }
}`

export const CHALLENGES_PAGE = gql`{
    articles {
        data {
            id
            color
            title
            icon_uri
        }
    }
    projects (sortByDesc: "updated_at") {
        data {
            id
            name
        }
    }
}`

export const ALL_CHALLENGES_ALBUM = gql`{
    challenges (sortByDesc: "updated_at", limit: 6, page: 1) {
        data {
            id
            likes_count
            comments_count
            doc_uri
            user {
                id
            }
            created_at
            context
            challenge
        }
    }
}`

export const CHALLENGE_ARTICLE = gql`query Articles ($challengeable_type: String!, $challengeable_id: Int!) {
    challenges (sortByDesc: "updated_at", challengeable_type: $challengeable_type, challengeable_id: $challengeable_id){
        data {
            id
            likes_count
            comments_count
            doc_uri
            user {
                id
            }
            created_at
            context
            challenge
        }
    }
}`

export const MODAL_CREATE_CHALLENGE = gql`query CreateChallenge {
    articles {
        data {
            id
            title
        }
    }
    projects {
        data {
            id
            name
        }
    }
}`

export const EXPLORE = gql`query Articles ($id: Int!, $idu: Int) {
    articles (id: $id) {
        data {
            id
            color
            icon_uri
            title
            photo_uri
            content
            figures {
                id
                figure
                context
                icon_uri
            }
            figures_count
        }
    }
    users (id: $idu) {
        data {
            articlesfollowing {
                id
            }
        }
    }
    figures (article_id: $id) {
        data {
            id
            figure
            context
        }
        }
}`

export const ORGANIZATIONS_PAGE = gql`{
    organizations (sortByDesc: "id") {
        data {
            id
            photo_uri
            name
            description
            webpage
        }
    }
}`
export const ORGANIZATIONS_PROFILE = gql`query organizations($id: Int!){
    organizations (id: $id) {
        data {
            id
            name
            description
            photo_uri
            webpage
            created_at
            projects {
                id
            }
            followers_count
            seals_count
            users_count
            users {
                publications {
                    id
                    title
                    user {id}
                    article {id}
                    content
                    doc_uri
                    updated_at
                }
            }
        }
    }
}`

export const PROJECTS_ARTICLE = gql`query projects ($id: Int) {
    projects (id: $id, sortByDesc: "updated_at") {
        data {
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
                user {
                    id
                    name
                }
            }
            challenges {
                id
                user {
                    id
                    name
                }
                context
                challenge
                doc_uri
                docs {
                    id
                }
                comments {
                    id
                    user {
                        name
                    }
                    content
                    doc_uri
                    likes {
                        user {
                            name
                            photo_uri
                        }
                    }
                    likes_count
                }
                likes_count
                likes {
                    user {
                        id
                    }
                    likeable_type
                    likeable_id
                }
            }
        }
    }
}`

export const PROJECTS_PAGE = gql` query projects{
    projects (sortByDesc: "updated_at") {
        data {
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
        }
    }
}`

export const PUBLICATIONS_ARTICLE = gql`query publications ($article_id: Int!){
    publications (article_id: $article_id, sortByDesc: "updated_at") {
        data {
            id
            title
            content
            comments_count
            likes_count
            doc_uri
            user {
                id
            }
            created_at
            updated_at
        }
    }
}`

export const GET_USER = gql`query Users ($id: Int!) {
    users(id: $id) {
        data {
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
            articlesfollowing {
                id
                title
                publications {
                    id
                    title
                    content
                    comments_count
                    likes_count
                    doc_uri
                    user {
                        id
                    }
                    created_at
                    updated_at
                }
                challenges {
                    id
                    user {
                        id
                    }
                    challenge
                    comments_count
                    likes_count
                    context
                    updated_at
                }
                projects {
                    id
                    name
                    context
                    photo_uri
                    organization {
                        id
                    }
                    updated_at
                }
            }
            organizationsfollowing {
                id
                name
                projects {
                    id
                    name
                    context
                    photo_uri
                    organization {
                        id
                        name
                        photo_uri
                    }
                    updated_at
                }
            }
            challenges {
                id
                name
                user {
                    id
                }
                challenge
                context
                likes_count
                comments_count
            }
        }
    }
    articles {
        data {
            id
            title
        }
    }
    projects {
        data {
            id
            name
            organization {
                id
                name
                photo_uri
            }
        }
    }
    organizations {
        data {
            id
            name
        }
    }
}`

export const USERS = gql`query users ($id: Int!) {
    users (id: $id) {
        data {
            id
            name
            position
            photo_uri
            organization {
                name
            }
        }
    }
}`
export const ALL_USERS = gql`query users ($page: Int!){
    users (limit: 15, page: $page) {
        data {
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
        total
        from
        to
        per_page
        current_page
        last_page
        has_more_pages
    }
}`

export const GET_COMMENTS = gql`query Comments ($type: String!, $id: Int!) {
    comments (commentable_type: $type, commentable_id: $id, sortByAsc: "created_at") {
        total
        per_page
        current_page
        from
        to
        last_page
        has_more_pages
        data {
            id
            user {
                id
            }
            content
            doc_uri
            updated_at
            created_at
            likes_count
            commentable_type
            commentable_id
        }
    }
}
`
export const ARTICLE_CREATE = gql`query articleCreate {
    articles {
        data {
            id
            title
            category {
                id
            }
            subcategory {
                id
            }
            color
            photo_uri
            icon_uri
            content
            figures {
                id
                figure
                context
                article {
                    id
                }
            }
        }
        total
        from
        to
        per_page
        current_page
        last_page
        has_more_pages
    }
    categories {
        data {
            id
            name
        }
    }
    subcategories {
        data {
            id
            name
        }
    }
}`

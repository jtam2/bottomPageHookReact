import { Card, CardBody, Container, Row, Col, CardTitle } from 'react-bootstrap'
import { POSTS } from './const/posts'
import useBottomPage from './utils/useBottomPage'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
    const PAGEINCREMENT = 5
    const [posts, setPosts] = useState([])
    const [pageStart, setpageStart] = useState(0)
    const isBottom = useBottomPage();

    useEffect(() => {
        setPosts(POSTS.slice(pageStart, pageStart + PAGEINCREMENT))
        setpageStart(pageStart + PAGEINCREMENT)
    }, [])

    const getPosts = () => {
        return new Promise((r) => {setTimeout(r, 2000)})
    }

    const handleScroll = () => {
        if (isBottom && pageStart + PAGEINCREMENT <= POSTS.length) {
            getPosts().then(() => { 
                    let newPosts = posts.concat(POSTS.slice(pageStart, pageStart + PAGEINCREMENT))
                    setPosts(newPosts)
                    setpageStart(pageStart + PAGEINCREMENT)
                }
            )

        }
    }

    return (
        <Container>     
            {handleScroll()} 
            {
                posts.map((post, index) => (
                    <Card key={`${post.title}-${index}`} bg='dark' text='light' className='m-3'>
                        <Row>
                            <Col>
                                <Card.Img src={post.image}/>
                            </Col>
                            <Col xs={9}>
                                <CardTitle>
                                    {post.title}
                                </CardTitle>
                                <CardBody>
                                    {post.content}
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                ))
            }
        </Container>
    );
}

export default App;

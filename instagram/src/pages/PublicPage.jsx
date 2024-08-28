import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Stack, Avatar, Grid, Button, Icon } from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import NavBar from '../../../components/NavBar';

const PublicPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated posts data
  const posts = Array(9).fill('https://via.placeholder.com/200');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulated user data
        const fetchedUserData = {
          avatar: 'https://via.placeholder.com/150',
          name: 'Norbu Dendup',
          bio: 'To get the throne\nU gotta walk the stairs up#',
          postsCount: 2,
          followersCount: 99,
          followingCount: 104,
        };

        setUserData(fetchedUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleFollow = () => {
    // Implement follow functionality here (e.g., update database or state)
    console.log(`Follow ${userData.name}`);
  };

  const handleMessage = () => {
    // Implement message functionality here
    console.log(`Message ${userData.name}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <Box display="flex">
      <NavBar />
      <Box flex="1" maxW="935px" mx="auto" p="20px" ml="400px" overflowY="auto" h="100vh">
        <Stack direction="row" spacing="30px" pb="20px" borderBottom="1px solid #dbdbdb">
          <Avatar size="2xl" src={userData.avatar} />
          <Stack spacing="25px" flex="1">
            <Stack direction="row" alignItems="center" spacing="10px">
              <Text fontSize="2xl" fontWeight="bold">{username}</Text>
              <Button variant="outline" size="sm" onClick={handleFollow}>
                Follow
              </Button>
              <Button variant="outline" size="sm" onClick={handleMessage}>
                Message
              </Button>
              <Icon as={FaCog} w={5} h={5} />
            </Stack>
            <Stack direction="row" spacing="10px">
              <Text><strong>{userData.postsCount}</strong> posts</Text>
              <Text><strong>{userData.followersCount}</strong> followers</Text>
              <Text><strong>{userData.followingCount}</strong> following</Text>
            </Stack>
            <Box>
              <Text fontWeight="bold">{userData.name}</Text>
              <Text>{userData.bio}</Text>
            </Box>
          </Stack>
        </Stack>
        <Text fontSize="2xl" fontWeight="bold" pt="20px">Posts</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap="2px" pt="20px">
          {posts.map((post, index) => (
            <Box key={index} position="relative">
              <Image src={post} alt={`Post ${index}`} boxSize="200px" objectFit="cover" />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PublicPage;

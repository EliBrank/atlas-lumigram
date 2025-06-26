import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
// import { ImagePreview } from '@/components/ImagePreview';
import { Button } from '@/components/Button';

export default function AddPage() {
  const [caption, setCaption] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const image = undefined;

  return (
    <View style={styles.container}>
      {/* <ImagePreview src={image} /> */}
      <View style={styles.footerContainer}>
        {!image && (
          <Button
            variant="primary"
            label="Choose a photo"
            includeImage
            onPress={() => alert('Choose a photo')}
          />
        )}
      </View>
      <Text style={{ color: '#999' }}>Add Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 20,
    width: '100%',
  },
  footerContainer: {
    width: '100%',
  },
});


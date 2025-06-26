import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Button } from '@/components/Button';
import { useImagePicker } from '@/hooks/useImagePicker';
import { ImagePreview } from '@/components/ImagePreview';
import { Colors } from '@/constants/Colors';

export default function AddPage() {
  const [caption, setCaption] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const { image, openImagePicker, reset } = useImagePicker();

  return (
    <View style={styles.container}>
      <ImagePreview imageUrl={image} />
      <View style={styles.footerContainer}>
        {!image && (
          <Button
            variant="primary"
            label="Choose a photo"
            includeImage
            onPress={openImagePicker}
            style={{ marginTop: 16 }}
          />
        )}
      </View>
      {image && (
        <View style={{ width: '100%' }}>
          <View>
            <TextInput
              placeholder='Add a caption'
              style={styles.captionInput}
            />
            <Button
              variant="primary"
              label="Save"
              onPress={() => alert('Save')}
            />
            <Button
              variant="plain"
              label="Reset"
              onPress={() => alert('Reset')}
              textInvert
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 20,
    paddingTop: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  footerContainer: {
    width: '100%',
  },
  captionInput: {
    outlineWidth: 1,
    outlineColor: Colors.accent,
    marginBlock: 16,
    padding: 12,
  }
});


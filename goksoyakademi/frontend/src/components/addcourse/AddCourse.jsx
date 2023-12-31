import React, { useEffect, useState, useRef } from "react";
import {
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  VStack,
  Button,
  Text,
  Heading,
  Flex,
  useMediaQuery,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Textarea,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAlertContext } from "../../context/AlertContext";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

//define video object
const initialVideo = { title: "", videoFile: "", isPreview: false };

// const initialPart = { name: "Part 1", videos: [initialVideo] };
const initialPart = () => {
  return { name: "Yeni Bölüm", videos: [{ ...initialVideo }] };
};

const AddCourse = () => {
  const inputRefs = useRef([]);
  const [isEditingPartName, setIsEditingPartName] = useState(null);
  const [editingPartName, setEditingPartName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingCourseName, setEditingCourseName] = useState("");
  const [courseName, setCourseName] = useState("Benim kursum");
  const [desc, setDesc] = useState("Kurs açıklamasını lütfen buraya yazın");
  const [prc, setPrice] = useState(300);
  const [isDraft, setIsDraft] = useState(null);
  const [id, setID] = useState(null);
  const [tags, setTags] = useState([]);

  //   const [parts, setParts] = useState([initialPart]);
  const [parts, setParts] = useState([initialPart()]);
  const toast = useToast();

  const { onOpen } = useAlertContext();
  // Focus the input field of the editing part
  useEffect(() => {
    if (isEditingPartName !== null && inputRefs.current[isEditingPartName]) {
      inputRefs.current[isEditingPartName].focus();
    }
  }, [isEditingPartName]);

  const automateID = () => {
    // const savedData = localStorage.getItem("courses");
    // if (savedData) {
    //   setID([...savedData].length + 1);
    // } else {
    //   setID(0);
    // }
    setID(uuidv4());
  };

  useEffect(() => {
    automateID();
  }, []);

  const handleCheckboxChange = (value) => {
    setTags((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const toggleEditPartName = (partIndex) => {
    if (isEditingPartName === partIndex) {
      setIsEditingPartName(null);
      setEditingPartName(""); // Reset the editingPartName when closing the input field
    } else {
      setIsEditingPartName(partIndex);
      setEditingPartName(parts[partIndex].name); // Set the initial value of the input field to the current part name
    }
  };

  const updateVideoTitle = (partIndex, videoIndex, newTitle) => {
    const newParts = [...parts];
    newParts[partIndex].videos[videoIndex].title = newTitle;
    setParts(newParts);
  };

  const updateIsPreview = (partIndex, videoIndex, isPreview) => {
    const newParts = [...parts];
    newParts[partIndex].videos[videoIndex].isPreview = isPreview;
    setParts(newParts);
  };

  //declare course object
  //will convert to axios put
  const saveToLocalStorage = (draftStatus) => {
    if (isDraft === null) {
      const courseData = {
        id,
        courseName,
        desc,
        prc,
        parts,
        tags: tags,
        isDraft: draftStatus,
        lastUpdated: new Date().toISOString(),
      };
      // Get current courses data from localStorage
      const currentData = localStorage.getItem("courses");
      // Parse current data, or use an empty array if there's no data
      const courses = currentData ? JSON.parse(currentData) : [];
      // Append new course data to the array
      courses.push(courseData);
      // Save updated courses data back to localStorage
      localStorage.setItem("courses", JSON.stringify(courses));
    } else {
      return;
    }
  };

  const addPart = () => {
    // setParts([...parts, initialPart]);
    setParts([...parts, initialPart()]);
  };

  // const addVideo = (partIndex) => {
  //   const newParts = [...parts];
  //   newParts[partIndex].videos.push(initialVideo);
  //   setParts(newParts);
  // };
  const addVideo = (partIndex) => {
    const newParts = [...parts];
    // Create a new initialVideo object each time you add a new video
    newParts[partIndex].videos.push({ ...initialVideo });
    setParts(newParts);
  };

  // handle part title operations

  const handleTitleChange = (partIndex, newName) => {
    const newParts = [...parts];
    newParts[partIndex].name = newName;
    setParts(newParts);
    toast({
      title: "Ünite başlığı değiştirildi",
      description: `Ünite başlığı "${newName}" olarak değiştirildi.`,
      status: "info",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleTitleSave = (partIndex, e) => {
    if (e.key === "Enter" || e.type === "blur") {
      handleTitleChange(partIndex, editingPartName);
      setIsEditingPartName(null); // This line closes the editing mode
    }
  };

  //handle course name operations

  const handleCourseNameChange = (newName) => {
    if (newName.length > 20) {
      toast({
        title: "Bu başlık çok uzun.",
        description: `Kurs başlığı değiştirilemedi.`,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      setEditingCourseName(courseName);
      return;
    }
    if (newName !== "") {
      setCourseName(newName);
      toast({
        title: "Kurs başlığı kaydedildi!",
        description: `Kurs adı "${newName}" olarak güncellendi.`,
        status: "info",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const handleCourseNameSave = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      handleCourseNameChange(editingCourseName);
    }
  };

  //handle description operations

  const handleDescriptionChange = (newName) => {
    if (newName.length > 40) {
      toast({
        title: "Bu açıklama çok uzun.",
        description: `Kurs açıklaması değiştirilemedi.`,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      setEditingDescription(desc);
      return;
    }
    if (newName !== "") {
      setDesc(newName);
      toast({
        title: "Kurs açıklaması kaydedildi!",
        description: `Açıklama "${newName}" olarak güncellendi.`,
        status: "info",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const handleDescriptionSave = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      handleDescriptionChange(editingDescription);
    }
  };

  const handlePublish = () => {
    setIsDraft(false);
    toast({
      title: "Kurs yayınlandı.",
      description: "Kurslarım sekmesinde görebilirsiniz!",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    toast({
      title: "Kurs taslak moda alındı.",
      description: "Kurslarım sekmesinden yayınlayabilirsiniz!",
      status: "warning",
      duration: 2500,
      isClosable: true,
    });
  };

  const removePart = (partIndex) => {
    const newParts = [...parts];
    newParts.splice(partIndex, 1);
    setParts(newParts);
  };

  const removeVideo = (partIndex, videoIndex) => {
    const newParts = [...parts];
    newParts[partIndex].videos.splice(videoIndex, 1);
    setParts(newParts);
  };

  const handleRemovePart = (partIndex) => {
    onOpen(
      "delete",
      "Bu üniteyi sildiğinde ünite içindeki videolar da kaybolacak, yine de silinsin mi?",
      () => removePart(partIndex)
    );
  };

  const handleRemoveVideo = (partIndex, videoIndex) => {
    onOpen("delete", "Bu videoyu silmek istediğinden emin misin?", () =>
      removeVideo(partIndex, videoIndex)
    );
  };

  return (
    <Box>
      <Box mb={4} p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Button
          me={3}
          onClick={() => {
            handleSaveDraft();
            saveToLocalStorage(true);
          }}
          colorScheme="yellow"
        >
          Taslağı Kaydet
        </Button>
        <Button
          onClick={() => {
            handlePublish();
            saveToLocalStorage(false);
          }}
          colorScheme="green"
        >
          Kursu Yayınla
        </Button>
      </Box>
      <Box mb={4} p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Text fontWeight={"bold"} fontSize={"xl"}>
          Kurs Bilgisi
        </Text>
        <Grid templateColumns="2fr 5fr" gap={6}>
          <Text>Kurs Başlığı</Text>
          <Text>Kurs Açıklaması</Text>
        </Grid>
        <Grid templateColumns="2fr 5fr" gap={6}>
          <Input
            value={editingCourseName}
            placeholder={courseName}
            onBlur={(e) => handleCourseNameSave(e)}
            onKeyPress={(e) => handleCourseNameSave(e)}
            onChange={(e) => setEditingCourseName(e.target.value)}
            size="md"
            p={2}
          />
          <Input
            value={editingDescription}
            placeholder={desc}
            onBlur={(e) => handleDescriptionSave(e)}
            onKeyPress={(e) => handleDescriptionSave(e)}
            onChange={(e) => setEditingDescription(e.target.value)}
            size="md"
            p={2}
          />
        </Grid>
        <Grid templateColumns="2fr 4fr" gap={6} mt={2}>
          <Select
            placeholder="Kurs Ücreti"
            onChange={(e) => setPrice(Number(e.target.value))}
          >
            <option value="250">250 TL</option>
            <option value="350">350 TL</option>
            <option value="450">450 TL</option>
            <option value="550">550 TL</option>
            <option value="650">650 TL</option>
            <option value="750">750 TL</option>
            <option value="850">850 TL</option>
          </Select>
          <Stack spacing={3} direction="row">
            <Checkbox
              onChange={() => handleCheckboxChange("Deneme Çözümü")}
              whiteSpace="nowrap"
            >
              Deneme Çözümü
            </Checkbox>
            <Checkbox
              onChange={() => handleCheckboxChange("Sınava Hazırlık")}
              whiteSpace="nowrap"
            >
              Sınava Hazırlık
            </Checkbox>
            <Checkbox
              onChange={() => handleCheckboxChange("Konu Anlatımı")}
              whiteSpace="nowrap"
            >
              Konu Anlatımı
            </Checkbox>
            <Checkbox
              onChange={() => handleCheckboxChange("Çeviri Odaklı")}
              whiteSpace="nowrap"
            >
              Çeviri Odaklı
            </Checkbox>
            <Checkbox
              onChange={() => handleCheckboxChange("Çıkmış Sınav")}
              whiteSpace="nowrap"
            >
              Çıkmış Sınav
            </Checkbox>
          </Stack>
        </Grid>
      </Box>

      <Accordion allowMultiple>
        {parts.map((part, partIndex) => (
          <AccordionItem>
            <motion.div
              key={partIndex}
              initial={{ height: 0, opacity: 0 }} // initial state
              animate={{ height: "auto", opacity: 1 }} // final state
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                opacity: { delay: 0.8, duration: 0.2 },
              }}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Box>
                <AccordionButton px={4}>
                  <Flex
                    alignItems="center"
                    mb={4}
                    justifyContent="space-between"
                    width="100%"
                  >
                    {isEditingPartName === partIndex ? (
                      <Input
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        ref={(el) => (inputRefs.current[partIndex] = el)}
                        value={editingPartName}
                        onBlur={(e) => handleTitleSave(partIndex, e)}
                        onKeyPress={(e) => handleTitleSave(partIndex, e)}
                        onChange={(e) => setEditingPartName(e.target.value)}
                        size="md"
                        p={2}
                      />
                    ) : (
                      <>
                        <Text
                          sx={{
                            _hover: {
                              bg: "rgba(0,0,0,0.2)",
                              cursor: "text",
                            },
                          }}
                          p={2}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditPartName(partIndex);
                          }}
                          fontSize="xl"
                        >{`Ünite ${partIndex + 1}: ${part.name}`}</Text>
                        <Text size="sm">
                          Bu ünitede {part.videos.length} içerik var.
                        </Text>
                        <Text
                          onClick={() => handleRemovePart(partIndex)}
                          size="sm"
                          _hover={{
                            fontStyle: "underline",
                          }}
                        >
                          Üniteyi Sil
                        </Text>
                      </>
                    )}
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {part.videos.map((video, videoIndex) => (
                    <Flex key={videoIndex} mt={4} align="center">
                      <FormControl
                        id={`videoTitle-${partIndex}-${videoIndex}`}
                        mr={2}
                      >
                        <Flex alignItems="center">
                          <FormLabel>Video Başlığıı</FormLabel>
                          <Checkbox
                            isChecked={video.isPreview}
                            onChange={(e) =>
                              updateIsPreview(
                                partIndex,
                                videoIndex,
                                e.target.checked
                              )
                            }
                          >
                            Önizleme Videosu
                          </Checkbox>
                        </Flex>
                        <Input
                          value={video.title}
                          onChange={(e) =>
                            updateVideoTitle(
                              partIndex,
                              videoIndex,
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormControl
                        id={`videoFile-${partIndex}-${videoIndex}`}
                        mr={2}
                      >
                        <FormLabel>Video Yükle</FormLabel>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            updateVideoFile(
                              partIndex,
                              videoIndex,
                              e.target.files[0]
                            )
                          }
                        />
                      </FormControl>
                      <Button
                        minW="200px"
                        mt={4}
                        onClick={() => handleRemoveVideo(partIndex, videoIndex)}
                        colorScheme="red"
                        variant="outline"
                      >
                        Videoyu Sil
                      </Button>
                    </Flex>
                  ))}
                  <Button
                    mt={4}
                    onClick={() => addVideo(partIndex)}
                    colorScheme="blue"
                    variant="outline"
                  >
                    Video Ekle
                  </Button>
                </AccordionPanel>
              </Box>
              {/* ... rest of your part rendering logic ... */}
            </motion.div>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        me={3}
        w="100%"
        h={"55px"}
        onClick={addPart}
        colorScheme="blue"
        variant="outline"
        d="flex"
        alignItems={"center"}
        fontSize={"xl"}
        fontWeight={"400"}
      >
        ÜNİTE EKLE
      </Button>
      <Box mt={4} p={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Button
          me={3}
          onClick={() => {
            handleSaveDraft();
            saveToLocalStorage(true);
          }}
          colorScheme="yellow"
        >
          Taslağı Kaydet
        </Button>
        <Button
          onClick={() => {
            handlePublish();
            saveToLocalStorage(false);
          }}
          colorScheme="green"
        >
          Kursu Yayınla
        </Button>
      </Box>
    </Box>
  );
};

export default AddCourse;

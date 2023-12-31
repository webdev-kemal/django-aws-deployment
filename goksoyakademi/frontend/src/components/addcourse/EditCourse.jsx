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
  Stack,
  Checkbox,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Accordion,
  Select,
  Spacer,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAlertContext } from "../../context/AlertContext";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";

const initialVideo = { title: "", videoFile: "", isPreview: true };

// const initialPart = { name: "Part 1", videos: [initialVideo] };
const initialPart = () => {
  return { name: "Yeni Bölüm", videos: [{ ...initialVideo }] };
};

const EditCourse = ({ switchDash }) => {
  const inputRefs = useRef([]);
  const [isEditingPartName, setIsEditingPartName] = useState(null);
  const [editingPartName, setEditingPartName] = useState("");
  const [isDraft, setIsDraft] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  //bu ID'ye göre datayı yükleyecek, ve buradaki save functionu id'yi eşleyip sadece bu kursu değiştirecek yeni kurs eklemeyecek.
  //add course kısmına girdiğimizde local storage'dan draftcourse verisini çekecek, sadece bir tane kurs olacak orada

  // Focus the input field of the editing part
  useEffect(() => {
    if (isEditingPartName !== null && inputRefs.current[isEditingPartName]) {
      inputRefs.current[isEditingPartName].focus();
    }
    console.log(id);
  }, [isEditingPartName]);

  const loadCourse = () => {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      const courses = JSON.parse(savedCourses);
      const course = courses.find((course) => course.id === id);
      if (course) {
        setCourseName(course.courseName);
        setDesc(course.desc);
        setPrice(course.prc);
        setParts(course.parts);
        setIsDraft(course.isDraft);
        // setTags(course.tags);
        // Assuming tags are part of the course data
        setTags(course.tags || []);
      }
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

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

  //will convert to axios put
  // const saveToLocalStorage = () => {
  //   const courseData = { id, courseName, desc, prc, parts };
  //   localStorage.setItem("courses", JSON.stringify([courseData])); // For simplicity, replacing any existing data
  //   loadCourses();
  // };

  const saveToLocalStorage = (draftStatus) => {
    const courseData = {
      id,
      courseName,
      tags,
      desc,
      prc,
      parts,
      isDraft: draftStatus,
      lastUpdated: new Date().toISOString(),
    };
    const currentData = localStorage.getItem("courses");
    const courses = currentData ? JSON.parse(currentData) : [];

    // Find the index of the course with the given id
    const courseIndex = courses.findIndex((course) => course.id === id);

    if (courseIndex !== -1) {
      // If the course exists, update its data
      courses[courseIndex] = courseData;
    } else {
      // If the course doesn't exist, append the new course data to the list
      courses.push(courseData);
    }

    // Save the updated list of courses back to local storage
    localStorage.setItem("courses", JSON.stringify(courses));
  };

  const toast = useToast();
  const { onOpen } = useAlertContext();

  const [courseName, setCourseName] = useState("Benim kursum");
  const [desc, setDesc] = useState("Kurs açıklamasını lütfen buraya yazın");
  const [prc, setPrice] = useState(300);
  const [tags, setTags] = useState([]);
  //   const [parts, setParts] = useState([initialPart]);
  const [parts, setParts] = useState([initialPart()]);
  const [editingCourseName, setEditingCourseName] = useState("");

  const [editingDescription, setEditingDescription] = useState("");

  const addPart = () => {
    // setParts([...parts, initialPart]);
    setParts([...parts, initialPart()]);
  };

  const addVideo = (partIndex) => {
    const newParts = [...parts];
    // Create a new initialVideo object each time you add a new video
    newParts[partIndex].videos.push({ ...initialVideo });
    setParts(newParts);
  };

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
      title: "Kurs taslak olarak kaydedildi.",
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
      <Box
        mb={4}
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
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
          me={3}
          onClick={() => {
            handlePublish();
            saveToLocalStorage(false);
          }}
          colorScheme="green"
        >
          Kursu Yayınla
        </Button>
        {isDraft ? (
          <Text fontWeight={"bold"}>[!] Kurs taslak modda.</Text>
        ) : (
          <Text fontWeight={"bold"}>[!] Kurs yayında.</Text>
        )}
        <Spacer />
        <Text
          as="u"
          onClick={() => {
            onOpen(
              "continue",
              "Kaydedilmemiş değişiklikler olabilir, yine de çıkılsın mı?",
              () => {
                switchDash();
                navigate("/protected");
              }
            );
          }}
          _hover={{ cursor: "pointer" }}
        >
          Kurslarıma geri dön --{">"}
        </Text>
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
            value={prc}
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
              isChecked={tags.includes("Deneme Çözümü")}
              onChange={() => handleCheckboxChange("Deneme Çözümü")}
              whiteSpace="nowrap"
            >
              Deneme Çözümü
            </Checkbox>
            <Checkbox
              isChecked={tags.includes("Sınava Hazırlık")}
              onChange={() => handleCheckboxChange("Sınava Hazırlık")}
              whiteSpace="nowrap"
            >
              Sınava Hazırlık
            </Checkbox>
            <Checkbox
              isChecked={tags.includes("Konu Anlatımı")}
              onChange={() => handleCheckboxChange("Konu Anlatımı")}
              whiteSpace="nowrap"
            >
              Konu Anlatımı
            </Checkbox>
            <Checkbox
              isChecked={tags.includes("Çeviri Odaklı")}
              onChange={() => handleCheckboxChange("Çeviri Odaklı")}
              whiteSpace="nowrap"
            >
              Çeviri Odaklı
            </Checkbox>
            <Checkbox
              isChecked={tags.includes("Çıkmış Sınav")}
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
                          _hover={{ bg: "rgba(0,0,0,0.2)" }}
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
                          <FormLabel>Video Başlığı</FormLabel>
                          <Checkbox
                            isChecked={video.isPreview}
                            onChange={(e) =>
                              updateIsPreview(
                                partIndex,
                                videoIndex,
                                e.target.checked
                              )
                            }
                            whiteSpace="nowrap"
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
        // mt={4}
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

export default EditCourse;

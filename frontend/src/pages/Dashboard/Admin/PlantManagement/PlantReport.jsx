import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../../assets/logo.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#DEDEDE",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    width: "20%",
    textAlign: "center",
    backgroundColor: "#DEDEDE",
  },
  tableCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 8,
    fontSize: 8,
    width: "20%",
    textAlign: "center",
  },
  tableColHeaderDescription: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    width: "70%",
    textAlign: "center",
    backgroundColor: "#DEDEDE",
  },
  tableColDescription: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 8,
    fontSize: 8,
    width: "70%",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  signatureContainerCenter: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginTop: 8,
    borderStyle: "dashed",
  },
  signatureText: {
    fontSize: 10,
    color: "#333333",
  },
});

const paginateData = (dataList, itemsPerPage) => {
  const pages = [];
  for (let i = 0; i < dataList.length; i += itemsPerPage) {
    pages.push(dataList.slice(i, i + itemsPerPage));
  }
  return pages;
};

const Footer = () => (
  <Text style={styles.footer}>
    © 2024 www.agripeace.lk copyright all right reserved.
  </Text>
);

const PlantReport = ({ dataList }) => {
  const reportDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
  });

  const paginatedData = paginateData(dataList, 6);

  return (
    <Document>
      {paginatedData.map((pageData, pageIndex) => (
        <Page
          key={pageIndex}
          size="Letter"
          orientation="landscape"
          style={styles.page}
        >
          <View style={styles.section}>
            {pageIndex === 0 && (
              <>
                <View style={styles.header}>
                  <View style={styles.headerTextContainer}>
                    <Image src={logo} style={styles.logo} />
                  </View>
                  <Text style={styles.headerText}>{reportDateTime}</Text>
                </View>
                <View style={styles.table}>
                  <Text style={styles.heading}>Plant Details</Text>
                </View>
              </>
            )}

            {/* Table of plant details */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Plant Name</Text>
                <Text style={styles.tableColHeaderDescription}>
                  Description
                </Text>
                <Text style={styles.tableColHeader}>Climate</Text>
                <Text style={styles.tableColHeader}>Soil pH</Text>
                <Text style={styles.tableColHeaderDescription}>
                  Land Preparation
                </Text>
                <Text style={styles.tableColHeaderDescription}>
                  Fertilizers
                </Text>
              </View>
              {pageData.map((plant, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{plant.name}</Text>
                  <Text style={styles.tableColDescription}>
                    {plant.description}
                  </Text>
                  <Text style={styles.tableCol}>{plant.climate}</Text>
                  <Text style={styles.tableCol}>{plant.soilPh}</Text>
                  <Text style={styles.tableColDescription}>
                    {plant.landPreparation}
                  </Text>
                  <Text style={styles.tableColDescription}>
                    {plant.fertilizers}
                  </Text>
                </View>
              ))}
            </View>

            {pageIndex === paginatedData.length - 1 && (
              <View style={styles.signatureContainerCenter}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>Signature</Text>
              </View>
            )}
          </View>

          {pageIndex === paginatedData.length - 1 && <Footer />}
        </Page>
      ))}
    </Document>
  );
};

export default PlantReport;

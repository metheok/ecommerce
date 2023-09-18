// CategoryModal.js
import React, { useState } from "react";
import { Button, Modal, Paper, Typography } from "@mui/material";
import css from "./CategoryModal.module.css";

const CategoryModal = ({
  categories,
  showCategoryModal,
  selectedCategory,
  onToggleCategoryModal,
  handleCategorySelect,
}) => {
  return (
    <div>
      <Modal open={showCategoryModal} onClose={onToggleCategoryModal}>
        <Paper className={css.modal}>
          <Typography variant="h6">Select a Category</Typography>
          <div className={css.categoryList}>
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategorySelect(category.name)}
                className={`${css.category} ${
                  selectedCategory === category.name ? css.selected : ""
                }`}
              >
                {category.name}
              </div>
            ))}
            <Button onClick={() => handleCategorySelect("")}>
              Clear Filter
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default CategoryModal;

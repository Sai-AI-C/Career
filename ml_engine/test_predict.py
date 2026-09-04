import unittest
import json
from ml_engine.predict_logic import predict_career, PILLARS

class TestPredictLogic(unittest.TestCase):

    def test_predict_career_success(self):
        sample_input = {
            "branch": "CSE AI-ML",
            "year_sem": "4-2",
            "grades": {
                "Matrices and Calculus": "10",
                "Applied Physics Laboratory": "9",
                "Programming for Problem Solving": "10",
                "Data Structures": "10",
                "Machine Learning": "10"
            }
        }
        res = predict_career(sample_input)
        self.assertIn("prediction", res)
        self.assertIn("roadmap", res)
        self.assertIn("pillar_stats", res)
        self.assertIsInstance(res["roadmap"], list)
        self.assertGreater(len(res["roadmap"]), 0)

    def test_laboratory_subject_pillar_mapping(self):
        sample_input = {
            "grades": {
                "Applied Physics Laboratory": "10",
                "Engineering Chemistry Laboratory": "10",
                "Data Structures Lab": "10"
            }
        }
        res = predict_career(sample_input)
        stats = res["pillar_stats"]
        self.assertEqual(stats["science"], 100.0)
        self.assertEqual(stats["coding"], 100.0)

    def test_empty_grades_returns_error(self):
        res = predict_career({"grades": {}})
        self.assertIn("error", res)

if __name__ == "__main__":
    unittest.main()

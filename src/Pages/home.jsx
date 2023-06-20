import React, { useEffect, useState } from "react";
import { Pokemon } from "../API/Pokemon";
import PokemonCard from "../Components/PokemonCard";
import { Button, Grid, TextField, Typography } from "@mui/material";
import loader from "../assets/loader.gif";
import Loader from "../Components/Loader";
import BasicModal from "../Components/Modal";
import AbilityFilter from "../Components/HomeFilter";
function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setallPokemons] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [ability, setability] = React.useState(null);
  const [showByAbility, setshowByAbility] = useState(null);
  const [showAllByAbility, setshowAllByAbility] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [abilities, setAbilities] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  useEffect(() => {
    setShowLoader(true);
    Pokemon.getAbilities({}, (res) => {
      setAbilities(res?.results);
    });
    console.log(ability, "<<<thisisability");
    if (ability != null && ability != "null") {
      Pokemon.getByAbility({ ability }, (res) => {
        console.log(res, "<<<thisis pokemon by ability");
        setTimeout(() => {
          setShowLoader(false);
        }, 2000);
        //    setPokemons(res.results)
        setshowByAbility(res.pokemon);
        setshowAllByAbility(res.pokemon);
      });
    } else {
      Pokemon.getAllPoken({ offset: pageCount - 1 }, (res) => {
        console.log(res, "<<<thisis pokemon");
        setTimeout(() => {
          setShowLoader(false);
        }, 2000);
        setPokemons(res.results);
        setallPokemons(res.results);
        setshowByAbility(null);
        setshowAllByAbility(null);
      });
    }
  }, [pageCount, ability]);

  const filterPokeons = (e) => {
    let value = e.target.value;
    if (value == "" || value == null || value == "null") {
      console.log(value.trim(), "<<<thisisvalue");
      if (showByAbility != null) {
        setshowByAbility(showAllByAbility);
      } else {
        setPokemons(allPokemons);
      }
    } else {
      let lowerValue = value?.toLowerCase();
      console.log(lowerValue, showByAbility, "<<<thisisfiltervalue");

      if (showByAbility != null) {
        let filteredData = showAllByAbility.filter((item) => {
          let lowerName = item?.pokemon?.name.toLowerCase();
          let matchIt = lowerName.match(lowerValue);
          if (matchIt) return true;
          else return false;
        });
        setshowByAbility(filteredData);
      } else {
        let filteredData = allPokemons.filter((item) => {
          let lowerName = item?.name.toLowerCase();
          let matchIt = lowerName.match(lowerValue);
          if (matchIt) return true;
          else return false;
        });
        setPokemons(filteredData);
      }
    }
  };

  return (
    <div className="bgcommon">
      <div className="home-top">
        <Grid container mt={2} justifyContent="space-between" rowGap={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Search Pokemon"
              fullWidth
              variant="outlined"
              onChange={filterPokeons}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <AbilityFilter
              abilities={abilities}
              setability={setability}
              ability={ability}
            />
          </Grid>
        </Grid>
      </div>
      <div className="containerS ">
        {showLoader && <Loader />}
        {!showLoader && (
          <>
            <Grid container rowGap={2} spacing={2}>
              {showByAbility == null
                ? pokemons?.map((item, key) => {
                    return (
                      <Grid item md={3} xs={6} key={key}>
                        <PokemonCard
                          key={key}
                          item={item}
                          setSelectedPokemon={setSelectedPokemon}
                        />
                      </Grid>
                    );
                  })
                : showByAbility?.map((item, key) => {
                    return (
                      <Grid item md={3} xs={6} key={key}>
                        <PokemonCard
                          key={key}
                          item={item.pokemon}
                          setSelectedPokemon={setSelectedPokemon}
                        />
                      </Grid>
                    );
                  })}
            </Grid>
            <div>
              <Grid container justifyContent="center" mt={5} mb={5}>
                <Grid mr={2}>
                  <Button
                    onClick={() => {
                      if (pageCount > 1) {
                        setPageCount(pageCount - 1);
                      }
                    }}
                    variant={pageCount == 1 ? "outlined" : "contained"}
                  >
                    Prev
                  </Button>
                </Grid>
                <Grid>
                  <Typography>{pageCount}</Typography>
                </Grid>
                <Grid ml={2}>
                  <Button
                    variant="contained"
                    onClick={() => setPageCount(pageCount + 1)}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>

      <BasicModal
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
}

export default Home;
